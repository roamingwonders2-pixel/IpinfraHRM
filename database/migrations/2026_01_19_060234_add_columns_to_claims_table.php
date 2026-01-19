<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('claims', function (Blueprint $table) {
            // Check if columns already exist before adding
            if (!Schema::hasColumn('claims', 'user_id')) {
                $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            }

            if (!Schema::hasColumn('claims', 'employee_id')) {
                $table->foreignId('employee_id')->nullable()->constrained()->onDelete('cascade');
            }

            if (!Schema::hasColumn('claims', 'claim_type')) {
                $table->string('claim_type')->default('mileage');
            }

            if (!Schema::hasColumn('claims', 'other_type')) {
                $table->string('other_type')->nullable();
            }

            if (!Schema::hasColumn('claims', 'distance_km')) {
                $table->decimal('distance_km', 8, 2)->default(0);
            }

            if (!Schema::hasColumn('claims', 'amount')) {
                $table->decimal('amount', 10, 2)->default(0);
            }

            if (!Schema::hasColumn('claims', 'description')) {
                $table->text('description')->nullable();
            }

            if (!Schema::hasColumn('claims', 'proof_path')) {
                $table->string('proof_path')->nullable();
            }

            if (!Schema::hasColumn('claims', 'status')) {
                $table->string('status')->default('pending');
            }

            if (!Schema::hasColumn('claims', 'submitted_at')) {
                $table->timestamp('submitted_at')->nullable();
            }

            if (!Schema::hasColumn('claims', 'approved_at')) {
                $table->timestamp('approved_at')->nullable();
            }

            if (!Schema::hasColumn('claims', 'rejected_at')) {
                $table->timestamp('rejected_at')->nullable();
            }

            if (!Schema::hasColumn('claims', 'rejection_reason')) {
                $table->text('rejection_reason')->nullable();
            }
        });
    }

    public function down(): void
    {
        Schema::table('claims', function (Blueprint $table) {
            // Only drop columns if they exist (safe rollback)
            $columns = [
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

            foreach ($columns as $column) {
                if (Schema::hasColumn('claims', $column)) {
                    if (in_array($column, ['user_id', 'employee_id'])) {
                        $table->dropForeign(['user_id']);
                        $table->dropForeign(['employee_id']);
                    }
                    $table->dropColumn($column);
                }
            }
        });
    }
};
