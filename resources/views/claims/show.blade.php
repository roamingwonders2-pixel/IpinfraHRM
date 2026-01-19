<!DOCTYPE html>
<html>
<head>
    <title>Claim Details - IpinfraHRM</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <style>
        body { 
            font-family: Arial, sans-serif; 
            background: #f5f5f5;
            padding: 20px;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            max-width: 800px;
            margin: 0 auto;
        }
        h1 {
            color: #333;
            border-bottom: 2px solid #007bff;
            padding-bottom: 10px;
            margin-bottom: 30px;
        }
        .claim-details {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-bottom: 30px;
        }
        .detail-group {
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #007bff;
        }
        .detail-label {
            font-weight: bold;
            color: #555;
            margin-bottom: 5px;
            font-size: 14px;
        }
        .detail-value {
            font-size: 16px;
            color: #333;
        }
        .status-badge {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 20px;
            font-weight: bold;
            font-size: 14px;
        }
        .status-pending { background: #fff3cd; color: #856404; }
        .status-approved { background: #d4edda; color: #155724; }
        .status-rejected { background: #f8d7da; color: #721c24; }
        .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            text-decoration: none;
            display: inline-block;
            margin-right: 10px;
        }
        .btn-primary { background: #007bff; color: white; }
        .btn-primary:hover { background: #0056b3; }
        .btn-secondary { background: #6c757d; color: white; }
        .btn-secondary:hover { background: #545b62; }
        .btn-danger { background: #dc3545; color: white; }
        .btn-danger:hover { background: #c82333; }
        .proof-section {
            margin-top: 30px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
        }
        .proof-image {
            max-width: 100%;
            max-height: 300px;
            border: 1px solid #ddd;
            border-radius: 5px;
            margin-top: 10px;
        }
        .back-link {
            display: inline-block;
            margin-top: 20px;
            color: #666;
            text-decoration: none;
        }
        .back-link:hover {
            color: #007bff;
        }
        .admin-actions {
            margin-top: 30px;
            padding: 20px;
            background: #fff3cd;
            border-radius: 8px;
            border-left: 4px solid #ffc107;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📄 Claim Details #{{ $claim->id }}</h1>
        
        @if(session('success'))
            <div style="background: #d4edda; color: #155724; padding: 12px; border-radius: 5px; margin-bottom: 20px;">
                ✅ {{ session('success') }}
            </div>
        @endif
        
        <div class="claim-details">
            <div class="detail-group">
                <div class="detail-label">Claim Status</div>
                <div class="detail-value">
                    @if($claim->status == 'pending')
                        <span class="status-badge status-pending">⏳ Pending Review</span>
                    @elseif($claim->status == 'approved')
                        <span class="status-badge status-approved">✅ Approved</span>
                        <div style="margin-top: 5px; font-size: 14px; color: #666;">
                            Approved on: {{ $claim->approved_at ? date('d/m/Y H:i', strtotime($claim->approved_at)) : 'N/A' }}
                        </div>
                    @elseif($claim->status == 'rejected')
                        <span class="status-badge status-rejected">❌ Rejected</span>
                        @if($claim->rejection_reason)
                            <div style="margin-top: 5px; font-size: 14px; color: #721c24;">
                                Reason: {{ $claim->rejection_reason }}
                            </div>
                        @endif
                    @endif
                </div>
            </div>
            
            <div class="detail-group">
                <div class="detail-label">Employee</div>
                <div class="detail-value">
                    {{ $claim->employee_name ?? 'N/A' }}
                    @if($claim->employee_email)
                        <div style="font-size: 14px; color: #666; margin-top: 3px;">
                            {{ $claim->employee_email }}
                        </div>
                    @endif
                </div>
            </div>
            
            <div class="detail-group">
                <div class="detail-label">Claim Type</div>
                <div class="detail-value">
                    @if($claim->claim_type == 'mileage') 🚗 
                    @elseif($claim->claim_type == 'travel') ✈️
                    @elseif($claim->claim_type == 'meal') 🍽️
                    @elseif($claim->claim_type == 'other') 📄
                    @endif
                    {{ ucfirst($claim->claim_type) }}
                    @if($claim->other_type)
                        <div style="font-size: 14px; color: #666; margin-top: 3px;">
                            ({{ $claim->other_type }})
                        </div>
                    @endif
                </div>
            </div>
            
            <div class="detail-group">
                <div class="detail-label">Amount</div>
                <div class="detail-value" style="font-size: 24px; font-weight: bold; color: #28a745;">
                    RM {{ number_format($claim->amount, 2) }}
                </div>
            </div>
            
            @if($claim->distance_km > 0)
            <div class="detail-group">
                <div class="detail-label">Distance</div>
                <div class="detail-value" style="font-size: 18px;">
                    {{ number_format($claim->distance_km, 1) }} KM
                </div>
            </div>
            @endif
            
            <div class="detail-group">
                <div class="detail-label">Submitted Date</div>
                <div class="detail-value">
                    {{ date('d/m/Y H:i', strtotime($claim->created_at)) }}
                </div>
            </div>
        </div>
        
        @if($claim->description)
        <div class="detail-group" style="grid-column: span 2;">
            <div class="detail-label">Description</div>
            <div class="detail-value">
                {{ $claim->description }}
            </div>
        </div>
        @endif
        
        @if($claim->proof_path)
        <div class="proof-section">
            <div class="detail-label">Proof Document</div>
            @php
                $extension = pathinfo($claim->proof_path, PATHINFO_EXTENSION);
                $isImage = in_array(strtolower($extension), ['jpg', 'jpeg', 'png', 'gif']);
            @endphp
            
            @if($isImage)
                <img src="{{ asset('storage/' . $claim->proof_path) }}" alt="Claim Proof" class="proof-image">
            @else
                <div style="padding: 15px; background: white; border-radius: 5px; margin-top: 10px;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div style="font-size: 24px;">📎</div>
                        <div>
                            <div style="font-weight: bold;">{{ basename($claim->proof_path) }}</div>
                            <div style="font-size: 14px; color: #666;">{{ strtoupper($extension) }} Document</div>
                        </div>
                    </div>
                </div>
            @endif
            
            <div style="margin-top: 15px;">
                <a href="{{ route('claims.download', $claim->id) }}" class="btn btn-primary">
                    📥 Download Proof
                </a>
            </div>
        </div>
        @endif
        
        @if(auth()->user()->type === 'company' || auth()->user()->type === 'admin')
            @if($claim->status == 'pending')
            <div class="admin-actions">
                <h3 style="margin-top: 0; color: #856404;">Admin Actions</h3>
                <div style="display: flex; gap: 10px; margin-top: 15px;">
                    <form action="{{ route('claims.approve', $claim->id) }}" method="POST">
                        @csrf
                        <button type="submit" class="btn btn-primary" 
                                onclick="return confirm('Approve claim #{{ $claim->id }} for RM {{ number_format($claim->amount, 2) }}?')">
                            ✅ Approve Claim
                        </button>
                    </form>
                    
                    <button class="btn btn-danger" onclick="rejectClaim()">
                        ❌ Reject Claim
                    </button>
                </div>
            </div>
            @endif
        @endif
        
        <div style="margin-top: 30px; display: flex; justify-content: space-between;">
            <a href="{{ url()->previous() }}" class="back-link">← Back to Previous Page</a>
            
            @if(auth()->user()->type === 'company' || auth()->user()->type === 'admin')
                <a href="{{ route('claims.admin') }}" class="btn btn-secondary">Back to Admin Dashboard</a>
            @else
                <a href="{{ route('claims.index') }}" class="btn btn-secondary">Back to My Claims</a>
            @endif
        </div>
    </div>

    <script>
    function rejectClaim() {
        const reason = prompt('Enter rejection reason for claim #{{ $claim->id }}:');
        if (reason && reason.trim() !== '') {
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = '/claims/{{ $claim->id }}/reject';
            form.style.display = 'none';
            
            const csrfToken = document.createElement('input');
            csrfToken.type = 'hidden';
            csrfToken.name = '_token';
            csrfToken.value = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            form.appendChild(csrfToken);
            
            const reasonInput = document.createElement('input');
            reasonInput.type = 'hidden';
            reasonInput.name = 'rejection_reason';
            reasonInput.value = reason.trim();
            form.appendChild(reasonInput);
            
            document.body.appendChild(form);
            form.submit();
        } else if (reason !== null) {
            alert('Please enter a rejection reason.');
        }
    }
    </script>
</body>
</html>