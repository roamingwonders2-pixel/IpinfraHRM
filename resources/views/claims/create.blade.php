<!DOCTYPE html>
<html>
<head>
    <title>Submit Claim - IpinfraHRM</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            background: #f5f5f5;
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
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
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
            color: #555;
        }
        input, select, textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
        }
        input:focus, select:focus, textarea:focus {
            outline: none;
            border-color: #007bff;
            box-shadow: 0 0 5px rgba(0,123,255,0.3);
        }
        .btn {
            background: #007bff;
            color: white;
            padding: 12px 25px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
        }
        .btn:hover {
            background: #0056b3;
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
        .required::after {
            content: " *";
            color: red;
        }
        .file-info {
            font-size: 14px;
            color: #666;
            margin-top: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📝 Submit Claim Form</h1>
        
        @if(session('success'))
            <div style="background: #d4edda; color: #155724; padding: 10px; border-radius: 5px; margin-bottom: 20px;">
                {{ session('success') }}
            </div>
        @endif
        
        <form method="POST" action="{{ route('claims.store') }}" enctype="multipart/form-data">
            @csrf
            
            <div class="form-group">
                <label class="required">Claim Type:</label>
                <select name="claim_type" required>
                    <option value="">-- Select Type --</option>
                    <option value="mileage">🚗 Mileage Claim</option>
                    <option value="travel">✈️ Travel Claim</option>
                    <option value="meal">🍽️ Meal Claim</option>
                    <option value="other">📄 Other Claim</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>Distance (KM):</label>
                <input type="number" name="distance_km" step="0.01" min="0" placeholder="e.g., 150.5">
                <div class="file-info">Leave blank if not applicable</div>
            </div>
            
            <div class="form-group">
                <label class="required">Amount (RM):</label>
                <input type="number" name="amount" step="0.01" min="0.01" required placeholder="e.g., 250.00">
            </div>
            
            <div class="form-group">
                <label>Description:</label>
                <textarea name="description" rows="4" placeholder="Brief description of the claim..."></textarea>
            </div>
            
            <div class="form-group">
                <label>Proof Document:</label>
                <input type="file" name="proof" accept=".jpg,.jpeg,.png,.pdf">
                <div class="file-info">Supported: JPG, PNG, PDF (Max 5MB)</div>
            </div>
            
            <button type="submit" class="btn">✅ Submit Claim</button>
        </form>
        
        <a href="{{ url('/dashboard') }}" class="back-link">← Back to Dashboard</a>
    </div>
</body>
</html>