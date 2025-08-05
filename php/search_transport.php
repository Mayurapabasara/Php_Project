<?php
// Start session for storing search data
session_start();

// Include database connection file
require_once 'db_connect.php';

// Check if form was submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $transport_type = $_POST['transport_type'] ?? '';
    $search_data = $_POST;
    
    // Store search data in session
    $_SESSION['search_data'] = $search_data;
    $_SESSION['transport_type'] = $transport_type;
    
    $suggestions = []; // Initialize suggestions array
    
    // Fetch data from database based on transport type
    switch ($transport_type) {
        case 'cars':
            $sql = "SELECT id, name, model, price, features, image, rating, availability FROM cars";
            break;
        case 'buses':
            $sql = "SELECT id, operator, departure_time, arrival_time, duration, price, type, rating, seats_available FROM buses";
            break;
        case 'trains':
            $sql = "SELECT id, name, departure_time, arrival_time, duration, price, class, rating, availability FROM trains";
            break;
        case 'transfers':
            $sql = "SELECT id, type, price, duration, features, rating, availability FROM transfers";
            break;
        default:
            $sql = ""; // No valid transport type
            break;
    }

    if (!empty($sql)) {
        $result = $conn->query($sql);
        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                // For features, convert comma-separated string back to array if needed for display
                if (isset($row['features'])) {
                    $row['features'] = explode(',', $row['features']);
                }
                $suggestions[] = $row;
            }
        }
    }
    
    // Close database connection
    $conn->close();

    // Function to get transport type title
    function getTransportTypeTitle($type) {
        $titles = [
            'cars' => 'Car Rentals',
            'buses' => 'Bus Tickets',
            'trains' => 'Train Tickets',
            'transfers' => 'Airport Transfers'
        ];
        return $titles[$type] ?? 'Transport Options';
    }
    
    // Function to format search details
    function formatSearchDetails($data, $type) {
        switch($type) {
            case 'cars':
                return [
                    '📍 Pickup: ' . ($data['pickup_location'] ?? 'Not specified'),
                    '📅 From: ' . ($data['pickup_date'] ?? 'Not specified'),
                    '📅 To: ' . ($data['return_date'] ?? 'Not specified')
                ];
            case 'buses':
                return [
                    '🚌 From: ' . ($data['from_city'] ?? 'Not specified'),
                    '🚌 To: ' . ($data['to_city'] ?? 'Not specified'),
                    '📅 Date: ' . ($data['travel_date'] ?? 'Not specified')
                ];
            case 'trains':
                return [
                    '🚂 From: ' . ($data['departure_station'] ?? 'Not specified'),
                    '🚂 To: ' . ($data['arrival_station'] ?? 'Not specified'),
                    '📅 Date: ' . ($data['travel_date'] ?? 'Not specified')
                ];
            case 'transfers':
                return [
                    '🚕 Service: ' . ($data['service_type'] ?? 'Not specified'),
                    '📍 Address: ' . ($data['address'] ?? 'Not specified'),
                    '📅 Time: ' . ($data['transfer_time'] ?? 'Not specified')
                ];
            default:
                return [];
        }
    }
    
    // Function to generate star rating
    function generateStars($rating) {
        return str_repeat('★', floor($rating)) . str_repeat('☆', 5 - floor($rating));
    }
    
} else {
    // Redirect back to main page if accessed directly
    header('Location: ../travel-transport.html');
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Search Results - Wanderlust</title>
    <link rel="stylesheet" href="../css/travel-transport.css">
    <style>
        .results-page {
            min-height: 100vh;
            background-color: #f8f8f8;
            padding: 2rem 0;
        }
        
        .results-container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        .back-button {
            background: linear-gradient(135deg, #000 0%, #333 100%);
            color: #ffd700;
            border: 2px solid #ffd700;
            padding: 0.75rem 1.5rem;
            border-radius: 25px;
            text-decoration: none;
            font-weight: bold;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 2rem;
            transition: all 0.3s ease;
        }
        
        .back-button:hover {
            background: linear-gradient(135deg, #ffd700 0%, #ffa500 100%);
            color: #000;
            transform: translateX(-5px);
        }
        
        .results-header {
            background: linear-gradient(135deg, #ffd700 0%, #ffa500 100%);
            padding: 2rem;
            border-radius: 15px;
            margin-bottom: 2rem;
            text-align: center;
        }
        
        .results-title {
            font-size: 2rem;
            color: #000;
            margin-bottom: 1rem;
            font-weight: bold;
        }
        
        .search-summary {
            background-color: rgba(0, 0, 0, 0.1);
            padding: 1rem;
            border-radius: 10px;
            margin-top: 1rem;
        }
        
        .search-details {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            justify-content: center;
        }
        
        .search-detail {
            background-color: #fff;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.9rem;
            color: #333;
            border: 1px solid #ddd;
        }
        
        .suggestions-grid {
            display: grid;
            gap: 1.5rem;
        }
        
        .suggestion-card {
            background-color: #fff;
            border: 2px solid #e0e0e0;
            border-radius: 15px;
            overflow: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .suggestion-card:hover {
            border-color: #ffd700;
            box-shadow: 0 10px 25px rgba(255, 215, 0, 0.2);
            transform: translateY(-2px);
        }
        
        .suggestion-header {
            background: linear-gradient(135deg, #000 0%, #333 100%);
            color: #fff;
            padding: 1rem 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .suggestion-number {
            background-color: #ffd700;
            color: #000;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }
        
        .suggestion-rating {
            color: #ffd700;
            font-size: 0.9rem;
        }
        
        .suggestion-body {
            padding: 1.5rem;
        }
        
        .suggestion-main {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 1rem;
            flex-wrap: wrap;
            gap: 1rem;
        }
        
        .suggestion-info h3 {
            color: #000;
            font-size: 1.3rem;
            margin-bottom: 0.5rem;
        }
        
        .suggestion-details {
            color: #666;
            font-size: 0.9rem;
            line-height: 1.4;
        }
        
        .suggestion-price {
            background: linear-gradient(135deg, #ffd700 0%, #ffa500 100%);
            color: #000;
            padding: 0.75rem 1.5rem;
            border-radius: 25px;
            font-weight: bold;
            font-size: 1.2rem;
            text-align: center;
        }
        
        .suggestion-features {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin: 1rem 0;
        }
        
        .feature-tag {
            background-color: #f0f0f0;
            color: #333;
            padding: 0.25rem 0.75rem;
            border-radius: 15px;
            font-size: 0.8rem;
        }
        
        .suggestion-status {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 15px;
            font-size: 0.8rem;
            font-weight: bold;
            text-transform: uppercase;
        }
        
        .status-available {
            background-color: #d4edda;
            color: #155724;
        }
        
        .status-limited {
            background-color: #fff3cd;
            color: #856404;
        }
        
        .status-waiting-list {
            background-color: #f8d7da;
            color: #721c24;
        }
        
        .suggestion-footer {
            background-color: #f8f8f8;
            padding: 1rem 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid #e0e0e0;
        }
        
        .book-button {
            background: linear-gradient(135deg, #000 0%, #333 100%);
            color: #ffd700;
            border: 2px solid #ffd700;
            padding: 0.75rem 1.5rem;
            border-radius: 25px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .book-button:hover {
            background: linear-gradient(135deg, #ffd700 0%, #ffa500 100%);
            color: #000;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(255, 215, 0, 0.4);
        }
        
        .no-results {
            text-align: center;
            padding: 3rem;
            background-color: #fff;
            border-radius: 15px;
            border: 2px dashed #ddd;
        }
        
        .no-results h3 {
            color: #666;
            margin-bottom: 1rem;
        }
        
        @media (max-width: 768px) {
            .results-title {
                font-size: 1.5rem;
            }
            
            .search-details {
                flex-direction: column;
                align-items: center;
            }
            
            .suggestion-main {
                flex-direction: column;
                align-items: flex-start;
            }
            
            .suggestion-footer {
                flex-direction: column;
                gap: 1rem;
                text-align: center;
            }
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="container">
            <h1 class="logo">Wanderlust</h1>
            <nav class="nav">
                <a href="../travel-transport.html" class="nav-link">Home</a>
                <a href="#" class="nav-link">Destinations</a>
                <a href="#" class="nav-link active">Services</a>
                <a href="#" class="nav-link">About</a>
                <a href="#" class="nav-link">Contact</a>
            </nav>
        </div>
    </header>

    <div class="results-page">
        <div class="results-container">
            <a href="../travel-and-transport.html" class="back-button">
                ← Back to Search
            </a>
            
            <div class="results-header">
                <h1 class="results-title">Available <?php echo getTransportTypeTitle($transport_type); ?></h1>
                <p><strong><?php echo count($suggestions); ?> options found</strong></p>
                
                <div class="search-summary">
                    <p><strong>Your Search:</strong></p>
                    <div class="search-details">
                        <?php foreach(formatSearchDetails($search_data, $transport_type) as $detail): ?>
                            <span class="search-detail"><?php echo htmlspecialchars($detail); ?></span>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
            
            <?php if (!empty($suggestions)): ?>
                <div class="suggestions-grid">
                    <?php foreach($suggestions as $index => $suggestion): ?>
                        <div class="suggestion-card">
                            <div class="suggestion-header">
                                <div class="suggestion-number"><?php echo $index + 1; ?></div>
                                <div class="suggestion-rating">
                                    <?php echo generateStars($suggestion['rating']); ?> <?php echo $suggestion['rating']; ?>
                                </div>
                            </div>
                            
                            <div class="suggestion-body">
                                <div class="suggestion-main">
                                    <div class="suggestion-info">
                                        <?php if ($transport_type == 'cars'): ?>
                                            <h3><?php echo htmlspecialchars($suggestion['name'] . ' - ' . $suggestion['model']); ?></h3>
                                            <div class="suggestion-details">
                                                Features: <?php echo implode(', ', $suggestion['features']); ?>
                                            </div>
                                            <div class="suggestion-features">
                                                <?php foreach($suggestion['features'] as $feature): ?>
                                                    <span class="feature-tag"><?php echo htmlspecialchars($feature); ?></span>
                                                <?php endforeach; ?>
                                            </div>
                                            <span class="suggestion-status status-<?php echo strtolower($suggestion['availability']); ?>">
                                                <?php echo $suggestion['availability']; ?>
                                            </span>
                                        <?php elseif ($transport_type == 'buses'): ?>
                                            <h3><?php echo htmlspecialchars($suggestion['operator'] . ' (' . $suggestion['type'] . ')'); ?></h3>
                                            <div class="suggestion-details">
                                                <?php echo $suggestion['departure_time']; ?> → <?php echo $suggestion['arrival_time']; ?> (<?php echo $suggestion['duration']; ?>)
                                            </div>
                                            <div style="color: #28a745; font-weight: 600; margin-top: 0.5rem;">
                                                <?php echo $suggestion['seats_available']; ?>
                                            </div>
                                        <?php elseif ($transport_type == 'trains'): ?>
                                            <h3><?php echo htmlspecialchars($suggestion['name'] . ' (' . $suggestion['class'] . ')'); ?></h3>
                                            <div class="suggestion-details">
                                                <?php echo $suggestion['departure_time']; ?> → <?php echo $suggestion['arrival_time']; ?> (<?php echo $suggestion['duration']; ?>)
                                            </div>
                                            <span class="suggestion-status status-<?php echo strtolower(str_replace(' ', '-', $suggestion['availability'])); ?>">
                                                <?php echo $suggestion['availability']; ?>
                                            </span>
                                        <?php elseif ($transport_type == 'transfers'): ?>
                                            <h3><?php echo htmlspecialchars($suggestion['type']); ?></h3>
                                            <div class="suggestion-details">
                                                Duration: <?php echo $suggestion['duration']; ?><br>
                                                Features: <?php echo implode(', ', $suggestion['features']); ?>
                                            </div>
                                            <div class="suggestion-features">
                                                <?php foreach($suggestion['features'] as $feature): ?>
                                                    <span class="feature-tag"><?php echo htmlspecialchars($feature); ?></span>
                                                <?php endforeach; ?>
                                            </div>
                                            <span class="suggestion-status status-<?php echo strtolower($suggestion['availability']); ?>">
                                                <?php echo $suggestion['availability']; ?>
                                            </span>
                                        <?php endif; ?>
                                    </div>
                                    
                                    <div class="suggestion-price">
                                        <?php echo htmlspecialchars($suggestion['price']); ?>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="suggestion-footer">
                                <div style="color: #666; font-size: 0.9rem;">
                                    Booking ID: BK<?php echo $suggestion['id'] . time(); ?>
                                </div>
                                <a href="book_transport.php?type=<?php echo $transport_type; ?>&id=<?php echo $suggestion['id']; ?>" class="book-button">
                                    Book Now →
                                </a>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php else: ?>
                <div class="no-results">
                    <h3>No results found</h3>
                    <p>Sorry, we couldn't find any <?php echo getTransportTypeTitle($transport_type); ?> matching your criteria.</p>
                    <a href="../travel-transport.html" class="book-button" style="margin-top: 1rem;">
                        ← Try Another Search
                    </a>
                </div>
            <?php endif; ?>
        </div>
    </div>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 Wanderlust. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>
