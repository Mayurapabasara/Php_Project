<?php
session_start();

// Include database connection file
require_once 'db_connect.php';

// Get booking parameters
$transport_type = $_GET['type'] ?? '';
$transport_id = $_GET['id'] ?? '';

// In a real application, you would:
// 1. Validate the booking parameters
// 2. Fetch details of the selected transport from the database using $transport_type and $transport_id
// 3. Process payment (external integration)
// 4. Store booking in database
// 5. Send confirmation email

// For demo purposes, we'll just show a confirmation and simulate booking storage
$booking_id = 'BK' . $transport_id . time();
$booking_date = date('Y-m-d H:i:s');

// --- Placeholder for actual booking insertion ---
// Example: Insert into bookings table
// $stmt = $conn->prepare("INSERT INTO bookings (transport_type, transport_id, customer_name, customer_email) VALUES (?, ?, ?, ?)");
// $stmt->bind_param("siss", $transport_type, $transport_id, "John Doe", "john.doe@example.com"); // Replace with actual customer data
// if ($stmt->execute()) {
//     // Booking successful
// } else {
//     // Handle error
// }
// $stmt->close();
// --- End Placeholder ---

// Close database connection
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmation - Wanderlust</title>
    <link rel="stylesheet" href="../css/travel-transport.css">
    <style>
        .confirmation-page {
            min-height: 100vh;
            background-color: #f8f8f8;
            padding: 2rem 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .confirmation-card {
            background-color: #fff;
            border-radius: 15px;
            padding: 3rem;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            max-width: 500px;
            width: 90%;
        }
        
        .success-icon {
            font-size: 4rem;
            color: #28a745;
            margin-bottom: 1rem;
        }
        
        .confirmation-title {
            font-size: 2rem;
            color: #000;
            margin-bottom: 1rem;
        }
        
        .booking-details {
            background-color: #f8f8f8;
            padding: 1.5rem;
            border-radius: 10px;
            margin: 2rem 0;
            text-align: left;
        }
        
        .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5rem;
            padding: 0.5rem 0;
            border-bottom: 1px solid #e0e0e0;
        }
        
        .detail-row:last-child {
            border-bottom: none;
        }
        
        .detail-label {
            font-weight: bold;
            color: #333;
        }
        
        .detail-value {
            color: #666;
        }
        
        .action-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .btn {
            padding: 0.75rem 1.5rem;
            border-radius: 25px;
            font-weight: bold;
            text-decoration: none;
            transition: all 0.3s ease;
            border: 2px solid transparent;
        }
        
        .btn-primary {
            background: linear-gradient(135deg, #ffd700 0%, #ffa500 100%);
            color: #000;
            border-color: #ffd700;
        }
        
        .btn-primary:hover {
            background: linear-gradient(135deg, #000 0%, #333 100%);
            color: #ffd700;
            border-color: #ffd700;
        }
        
        .btn-secondary {
            background-color: #6c757d;
            color: #fff;
            border-color: #6c757d;
        }
        
        .btn-secondary:hover {
            background-color: #5a6268;
            border-color: #5a6268;
        }
    </style>
</head>
<body>
    <div class="confirmation-page">
        <div class="confirmation-card">
            <div class="success-icon">✅</div>
            <h1 class="confirmation-title">Booking Confirmed!</h1>
            <p>Your transport booking has been successfully confirmed.</p>
            
            <div class="booking-details">
                <div class="detail-row">
                    <span class="detail-label">Booking ID:</span>
                    <span class="detail-value"><?php echo htmlspecialchars($booking_id); ?></span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Transport Type:</span>
                    <span class="detail-value"><?php echo ucfirst(htmlspecialchars($transport_type)); ?></span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Booking Date:</span>
                    <span class="detail-value"><?php echo $booking_date; ?></span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Status:</span>
                    <span class="detail-value" style="color: #28a745; font-weight: bold;">Confirmed</span>
                </div>
            </div>
            
            <p style="color: #666; margin-bottom: 2rem;">
                A confirmation email has been sent to your registered email address with all the booking details.
            </p>
            
            <div class="action-buttons">
                <a href="../travel-transport.html" class="btn btn-primary">New Search</a>
                <a href="#" class="btn btn-secondary" onclick="window.print()">Print Confirmation</a>
            </div>
        </div>
    </div>
</body>
</html>