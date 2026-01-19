<!DOCTYPE html>
<html>
<head>
    <title>My Claims - IpinfraHRM</title>
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
            max-width: 1000px;
            margin: 0 auto;
        }
        h1 {
            color: #333;
            border-bottom: 2px solid #007bff;
            padding-bottom: 10px;
        }
        .btn {
            background: #007bff;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
        }
        .btn:hover {
            background: #0056b3;
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
        .empty-state {
            text-align: center;
            padding: 40px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h1>📋 My Claims</h1>
            <a href="{{ route('claims.create') }}" class="btn">+ New Claim</a>
        </div>
        
        @if(session('success'))
            <div style="background: #d4edda; color: #155724; padding: 10px; border-radius: 5px; margin-bottom: 20px;">
                {{ session('success') }}
            </div>
        @endif
        
        @if($claims->count() > 0)
        <table>
            <thead>
                <tr>
                    <th>ID</th>
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
                    <td>#{{ $claim->id }}</td>
                    <td>{{ ucfirst($claim->claim_type) }}</td>
                    <td>RM {{ number_format($claim->amount, 2) }}</td>
                    <td>{{ $claim->distance_km ? $claim->distance_km . ' KM' : '-' }}</td>
                    <td>
                        @if($claim->status == 'pending')
                            <span class="status-pending">⏳ Pending</span>
                        @elseif($claim->status == 'approved')
                            <span class="status-approved">✅ Approved</span>
                        @elseif($claim->status == 'rejected')
                            <span class="status-rejected">❌ Rejected</span>
                        @endif
                    </td>
                    <td>{{ date('d/m/Y', strtotime($claim->created_at)) }}</td>
                    <td>
                        <button style="background: #6c757d; padding: 5px 10px; color: white; border: none; border-radius: 3px;">
                            View
                        </button>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
        @else
        <div class="empty-state">
            <h3>No claims submitted yet</h3>
            <p>Submit your first claim to get started</p>
            <a href="{{ route('claims.create') }}" class="btn" style="margin-top: 20px;">Submit First Claim</a>
        </div>
        @endif
        
        <div style="margin-top: 30px; text-align: center;">
            <a href="{{ url('/dashboard') }}" style="color: #666; text-decoration: none;">← Back to Dashboard</a>
        </div>
    </div>
</body>
</html>