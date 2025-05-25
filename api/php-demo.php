<?php
// Simple PHP Demo for Strata Management
header('Content-Type: text/html; charset=utf-8');

// Sample data
$building_name = 'StrataSphere Building';
$current_date = date('F j, Y \a\t g:i A');

$units = [
    ['unit' => '101', 'owner' => 'Emma Thompson', 'status' => 'Occupied'],
    ['unit' => '203', 'owner' => 'James Wilson', 'status' => 'Vacant'],
    ['unit' => '305', 'owner' => 'Sarah Rodriguez', 'status' => 'Occupied'],
    ['unit' => '410', 'owner' => 'Michael Chen', 'status' => 'Occupied']
];

// Calculate stats
$total_units = count($units);
$occupied_units = 0;
foreach ($units as $unit) {
    if ($unit['status'] === 'Occupied') {
        $occupied_units++;
    }
}
$vacant_units = $total_units - $occupied_units;
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StrataSphere - PHP Demo</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: Arial, sans-serif;
            background-color: #f3f4f6;
            color: #333;
        }

        /* Header */
        .header {
            background: white;
            border-bottom: 1px solid #e5e7eb;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .header-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 12px 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo-section {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .logo {
            width: 40px;
            height: 40px;
            background: #2563eb;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
        }
        
        .site-title {
            font-size: 20px;
            font-weight: bold;
            color: #111827;
        }

        /* Navigation */
        .nav {
            background: #374151;
        }
        
        .nav-content {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            height: 48px;
        }
        
        .nav-item {
            padding: 0 16px;
            color: white;
            text-decoration: none;
            display: flex;
            align-items: center;
            transition: background-color 0.2s;
        }
        
        .nav-item:hover {
            background: #4b5563;
        }
        
        .nav-item.active {
            background: #111827;
        }

        /* Main content */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 24px 16px;
        }
        
        .page-title {
            font-size: 28px;
            font-weight: bold;
            color: #111827;
            margin-bottom: 8px;
        }
        
        .php-badge {
            background: #10b981;
            color: white;
            padding: 8px 16px;
            border-radius: 6px;
            margin-bottom: 32px;
            display: inline-block;
            font-weight: bold;
        }
        
        .section {
            background: white;
            padding: 24px;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            margin-bottom: 24px;
        }
        
        .section-title {
            font-size: 20px;
            font-weight: bold;
            color: #111827;
            margin-bottom: 16px;
        }

        /* Building info */
        .building-info {
            background: #f9fafb;
            padding: 16px;
            border-radius: 6px;
            margin-bottom: 16px;
        }

        /* Table */
        table {
            width: 100%;
            border-collapse: collapse;
        }
        
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #e5e7eb;
        }
        
        th {
            background-color: #f9fafb;
            font-weight: bold;
            color: #374151;
        }
        
        tr:hover {
            background-color: #f9fafb;
        }
        
        .status-occupied {
            color: #10b981;
            font-weight: bold;
        }
        
        .status-vacant {
            color: #f59e0b;
            font-weight: bold;
        }

        /* Stats */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 16px;
        }
        
        .stat-card {
            background: #2563eb;
            color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }
        
        .stat-number {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 4px;
        }
        
        .stat-label {
            font-size: 14px;
            opacity: 0.9;
        }

        /* Footer */
        .footer {
            background: #374151;
            color: white;
            text-align: center;
            padding: 16px;
            margin-top: 40px;
        }
        
        .footer a {
            color: #d1d5db;
            text-decoration: none;
            margin: 0 8px;
        }
        
        .footer a:hover {
            color: white;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="header-content">
            <div class="logo-section">
                <div class="logo">S</div>
                <h1 class="site-title">StrataSphere</h1>
            </div>
            <div style="font-size: 14px; color: #6b7280;">Welcome, Admin</div>
        </div>
    </header>

    <!-- Navigation -->
    <nav class="nav">
        <div class="nav-content">
            <a href="/dashboard" class="nav-item">🏠 Dashboard</a>
            <a href="/financial" class="nav-item">💳 Financials</a>
            <a href="/maintenance" class="nav-item">🔧 Maintenance</a>
            <a href="/documents" class="nav-item">📄 Documents</a>
            <a href="/community" class="nav-item">👥 Community</a>
            <a href="/api/php-demo.php" class="nav-item active">⚡ PHP Demo</a>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="container">
        <h2 class="page-title">PHP Demo</h2>
        <div class="php-badge">
            ✅ Powered by PHP <?php echo phpversion(); ?> on Vercel
        </div>

        <!-- Section 1: Building Information -->
        <div class="section">
            <h3 class="section-title">Building Information</h3>
            <div class="building-info">
                <p><strong>Building:</strong> <?php echo $building_name; ?></p>
                <p><strong>Address:</strong> 123 Management Street, Sydney NSW 2000</p>
                <p><strong>Generated:</strong> <?php echo $current_date; ?></p>
            </div>
        </div>

        <!-- Section 2: Unit Directory -->
        <div class="section">
            <h3 class="section-title">Unit Directory</h3>
            <table>
                <thead>
                    <tr>
                        <th>Unit</th>
                        <th>Owner</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($units as $unit): ?>
                    <tr>
                        <td><strong><?php echo $unit['unit']; ?></strong></td>
                        <td><?php echo $unit['owner']; ?></td>
                        <td class="<?php echo $unit['status'] === 'Occupied' ? 'status-occupied' : 'status-vacant'; ?>">
                            <?php echo $unit['status']; ?>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>

        <!-- Section 3: Quick Statistics -->
        <div class="section">
            <h3 class="section-title">Quick Statistics</h3>
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-number"><?php echo $total_units; ?></div>
                    <div class="stat-label">Total Units</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number"><?php echo $occupied_units; ?></div>
                    <div class="stat-label">Occupied</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number"><?php echo $vacant_units; ?></div>
                    <div class="stat-label">Vacant</div>
                </div>
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <p>&copy; 2025 StrataSphere. All rights reserved. | 
        <a href="/terms">Terms</a> | 
        <a href="/privacy">Privacy</a> | 
        <a href="/contact">Contact</a></p>
    </footer>
</body>
</html>