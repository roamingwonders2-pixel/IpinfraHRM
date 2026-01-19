<!DOCTYPE html>
<html>
<head>
    <title>Claims Admin - IpinfraHRM</title>
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
        }
        h1 {
            color: #333;
            border-bottom: 2px solid #007bff;
            padding-bottom: 10px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        th {
            background: #f8f9fa;
            font-weight: bold;
        }
        .status-pending { background: #fff3cd; color: #856404; padding: 5px 10px; border-radius: 3px; }
        .status-approved { background: #d4edda; color: #155724; padding: 5px 10px; border-radius: 3px; }
        .status-rejected { background: #f8d7da; color: #721c24; padding: 5px 10px; border-radius: 3px; }
        .btn {
            padding: 6px 12px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin: 2px;
            font-size: 14px;
            transition: all 0.2s;
        }
        .btn-approve {
            background: #28a745;
            color: white;
        }
        .btn-approve:hover {
            background: #218838;
        }
        .btn-reject {
            background: #dc3545;
            color: white;
        }
        .btn-reject:hover {
            background: #c82333;
        }
        .btn-view {
            background: #007bff;
            color: white;
        }
        .btn-view:hover {
            background: #0056b3;
        }
        .back-link {
            display: inline-block;
            margin-top: 20px;
            color: #666;
            text-decoration: none;
            padding: 8px 16px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        .back-link:hover {
            color: #007bff;
            border-color: #007bff;
            background: #f8f9fa;
        }
        .alert {
            padding: 12px 16px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .alert-success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        .alert-error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        .action-buttons {
            display: flex;
            gap: 5px;
            flex-wrap: wrap;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>👑 Claims Admin Dashboard</h1>

        @if(session('success'))
            <div class="alert alert-success">
                ✅ {{ session('success') }}
            </div>
        @endif

        @if(session('error'))
            <div class="alert alert-error">
                ❌ {{ session('error') }}
            </div>
        @endif

        <p><strong>Total Claims:</strong> {{ $claims->count() }}</p>

        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Employee</th>
                    <th>Type</th>
                    <th>Amount (RM)</th>
                    <th>Distance</th>
                    <th>Status</th>
                    <th>Submitted</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach($claims as $claim)
                <tr>
                    <td><strong>#{{ $claim->id }}</strong></td>
                    <td>
                        <strong>{{ $claim->employee_name }}</strong><br>
                        <small>{{ $claim->employee_email }}</small>
                    </td>
                    <td>
                        @if($claim->claim_type == 'mileage') 🚗
                        @elseif($claim->claim_type == 'travel') ✈️
                        @elseif($claim->claim_type == 'meal') 🍽️
                        @elseif($claim->claim_type == 'other') 📄
                        @endif
                        {{ ucfirst($claim->claim_type) }}
                        @if($claim->other_type)
                            <br><small>({{ $claim->other_type }})</small>
                        @endif
                    </td>
                    <td><strong>RM {{ number_format($claim->amount, 2) }}</strong></td>
                    <td>
                        @if($claim->distance_km > 0)
                            {{ number_format($claim->distance_km, 1) }} KM
                        @else
                            -
                        @endif
                    </td>
                    <td>
                        @if($claim->status == 'pending')
                            <span class="status-pending">⏳ Pending</span>
                        @elseif($claim->status == 'approved')
                            <span class="status-approved">✅ Approved</span>
                            <br><small>{{ $claim->approved_at ? date('d/m/Y', strtotime($claim->approved_at)) : '' }}</small>
                        @elseif($claim->status == 'rejected')
                            <span class="status-rejected">❌ Rejected</span>
                            @if($claim->rejection_reason)
                                <br><small title="{{ $claim->rejection_reason }}">Reason given</small>
                            @endif
                        @else
                            <span>{{ $claim->status }}</span>
                        @endif
                    </td>
                    <td>{{ date('d/m/Y H:i', strtotime($claim->created_at)) }}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-view" onclick="viewClaim({{ $claim->id }})">View</button>

                            @if($claim->status == 'pending')
                                <form action="{{ route('claims.approve', $claim->id) }}" method="POST" style="display: inline;">
                                    @csrf
                                    <button type="submit" class="btn btn-approve"
                                            onclick="return confirm('✅ Approve claim #{{ $claim->id }} from {{ $claim->employee_name }} for RM {{ number_format($claim->amount, 2) }}?')">
                                        Approve
                                    </button>
                                </form>

                                <button class="btn btn-reject" onclick="rejectClaim({{ $claim->id }}, '{{ $claim->employee_name }}', {{ $claim->amount }})">
                                    Reject
                                </button>
                            @endif
                        </div>
                    </td>
                </tr>
                @endforeach

                @if($claims->isEmpty())
                <tr>
                    <td colspan="8" style="text-align: center; padding: 40px;">
                        <div style="font-size: 18px; color: #666; margin-bottom: 10px;">
                            📭 No claims submitted yet
                        </div>
                        <p style="color: #999;">When employees submit claims, they will appear here.</p>
                    </td>
                </tr>
                @endif
            </tbody>
        </table>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <a href="{{ url('/dashboard') }}" class="back-link">← Back to Dashboard</a>
            <div style="float: right; color: #666; font-size: 14px;">
                Last updated: {{ now()->format('d/m/Y H:i') }}
            </div>
        </div>
    </div>

    <script>
    function viewClaim(id) {
        window.open('/claims/' + id, '_blank');
    }

    function rejectClaim(id, employeeName, amount) {
        const reason = prompt(`❌ Reject claim #${id}\n\nEmployee: ${employeeName}\nAmount: RM ${amount.toFixed(2)}\n\nPlease enter rejection reason:`);

        if (reason && reason.trim() !== '') {
            // Create form dynamically
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = '/claims/' + id + '/reject';
            form.style.display = 'none';

            // CSRF token
            const csrfToken = document.createElement('input');
            csrfToken.type = 'hidden';
            csrfToken.name = '_token';
            csrfToken.value = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            form.appendChild(csrfToken);

            // Rejection reason
            const reasonInput = document.createElement('input');
            reasonInput.type = 'hidden';
            reasonInput.name = 'rejection_reason';
            reasonInput.value = reason.trim();
            form.appendChild(reasonInput);

            // Add to body and submit
            document.body.appendChild(form);
            form.submit();
        } else if (reason !== null) {
            alert('Please enter a rejection reason.');
        }
    }

    // Auto refresh every 30 seconds to see new claims
    setTimeout(function() {
        window.location.reload();
    }, 30000); // 30 seconds
    </script>
</body>
</html>
