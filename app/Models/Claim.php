<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Claim extends Model
{
    protected $fillable = [
        'user_id',
        'employee_id',
        'claim_type',
        'other_type',
        'distance_km',
        'amount',
        'description',
        'proof_path',
        'status',
        'submitted_at',
        'approved_at',
        'rejected_at',
        'rejection_reason'
    ];

    protected $casts = [
        'distance_km' => 'decimal:2',
        'amount' => 'decimal:2',
        'submitted_at' => 'datetime',
        'approved_at' => 'datetime',
        'rejected_at' => 'datetime',
    ];

    // Status constants
    const STATUS_PENDING = 'pending';
    const STATUS_APPROVED = 'approved';
    const STATUS_REJECTED = 'rejected';

    // Type constants
    const TYPE_MILEAGE = 'mileage';
    const TYPE_TRAVEL = 'travel';
    const TYPE_MEAL = 'meal';
    const TYPE_OTHER = 'other';

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }

    // Helper methods
    public function isPending(): bool
    {
        return $this->status === self::STATUS_PENDING;
    }

    public function isApproved(): bool
    {
        return $this->status === self::STATUS_APPROVED;
    }

    public function isRejected(): bool
    {
        return $this->status === self::STATUS_REJECTED;
    }
}
