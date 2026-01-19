<?php

namespace App\Http\Controllers;

use App\Models\Claim;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ClaimController extends Controller
{
    // Employee: View their claims
    public function index()
    {
        $claims = Claim::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return view('claims.index', compact('claims'));
    }

    // Employee: Show claim form
    public function create()
    {
        return view('claims.create');
    }

    // Employee: Submit claim
    public function store(Request $request)
    {
        $validated = $request->validate([
            'claim_type' => 'required|in:mileage,travel,meal,other',
            'other_type' => 'required_if:claim_type,other|max:100',
            'distance_km' => 'nullable|numeric|min:0|max:99999',
            'amount' => 'required|numeric|min:0.01|max:999999.99',
            'description' => 'nullable|string|max:1000',
            'proof' => 'nullable|file|max:5120|mimes:jpg,jpeg,png,pdf',
        ]);

        $proofPath = null;
        if ($request->hasFile('proof')) {
            $proofPath = $request->file('proof')->store('claims', 'public');
        }

        Claim::create([
            'user_id' => Auth::id(),
           'employee_id' => null,
            'claim_type' => $validated['claim_type'],
            'other_type' => $validated['claim_type'] === 'other' ? $validated['other_type'] : null,
            'distance_km' => $validated['distance_km'] ?? 0,
            'amount' => $validated['amount'],
            'description' => $validated['description'],
            'proof_path' => $proofPath,
            'status' => 'pending',
            'submitted_at' => now(),
        ]);

        return redirect()->route('claims.index')
            ->with('success', 'Claim submitted successfully! It will be reviewed by admin.');
    }

    // View single claim
    public function show($id)
    {
        $claim = Claim::findOrFail($id);

        // Load user relationship
        $claim->load('user');

        // Authorization - user can only see their own claims unless admin
        if (Auth::id() !== $claim->user_id && !in_array(Auth::user()->type, ['company', 'admin'])) {
            abort(403, 'Unauthorized access.');
        }

        return view('claims.show', compact('claim'));
    }

    // Download proof file
    public function downloadProof($id)
    {
        $claim = Claim::findOrFail($id);

        if (!$claim->proof_path) {
            abort(404, 'File not found.');
        }

        // Authorization
        if (Auth::id() !== $claim->user_id && !in_array(Auth::user()->type, ['company', 'admin'])) {
            abort(403, 'Unauthorized access.');
        }

        return Storage::disk('public')->download($claim->proof_path);
    }

    // Admin: View all claims
    public function adminIndex()
    {
        // Check if user is admin
        if (!in_array(Auth::user()->type, ['company', 'admin'])) {
            abort(403, 'Unauthorized access.');
        }

        $claims = DB::table('claims')
            ->join('users', 'claims.user_id', '=', 'users.id')
            ->select(
                'claims.*',
                'users.name as employee_name',
                'users.email as employee_email'
            )
            ->orderBy('claims.created_at', 'desc')
            ->get();

        return view('claims.admin', compact('claims'));
    }

    // Admin: Approve claim
    public function approve($id)
    {
        $claim = Claim::findOrFail($id);

        // Check if user is admin
        if (!in_array(Auth::user()->type, ['company', 'admin'])) {
            abort(403, 'Unauthorized access.');
        }

        $claim->update([
            'status' => 'approved',
            'approved_at' => now(),
            'rejected_at' => null,
            'rejection_reason' => null,
        ]);

        return back()->with('success', 'Claim #' . $id . ' approved successfully!');
    }

    // Admin: Reject claim
    public function reject(Request $request, $id)
    {
        $request->validate([
            'rejection_reason' => 'required|string|max:500',
        ]);

        $claim = Claim::findOrFail($id);

        // Check if user is admin
        if (!in_array(Auth::user()->type, ['company', 'admin'])) {
            abort(403, 'Unauthorized access.');
        }

        $claim->update([
            'status' => 'rejected',
            'rejected_at' => now(),
            'rejection_reason' => $request->rejection_reason,
            'approved_at' => null,
        ]);

        return back()->with('success', 'Claim #' . $id . ' rejected.');
    }
}
