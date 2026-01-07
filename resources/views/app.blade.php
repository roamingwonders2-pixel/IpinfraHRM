<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    {{-- Inline script to detect system dark mode preference and apply it immediately --}}
    <script>
        (function() {
            const appearance = '{{ $appearance ?? 'system' }}';

            if (appearance === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (prefersDark) {
                    document.documentElement.classList.add('dark');
                }
            }
        })();
    </script>

    {{-- Inline style to set the HTML background color based on our theme in app.css --}}
    <style>
        html {
            background-color: oklch(1 0 0);
        }

        html.dark {
            background-color: oklch(0.145 0 0);
        }

        /* IPINFRA NETWORKS SDN BHD Brand Colors */
        :root {
            --ipinfra-primary: #0056b3;
            --ipinfra-secondary: #00a86b;
            --ipinfra-accent: #ff6b35;
        }
    </style>

    <title inertia>IPINFRA NETWORKS SDN BHD - HR & Payroll System</title>

    <!-- Company Meta Information -->
    <meta name="description" content="IPINFRA NETWORKS SDN BHD - Human Resource & Payroll Management System">
    <meta name="author" content="IPINFRA NETWORKS SDN BHD">
    <meta name="keywords" content="HRM, Payroll, Malaysia, Employee Management, IPINFRA">

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="{{ asset('images/logo-favicon.ico') }}">
    <link rel="apple-touch-icon" href="{{ asset('images/logo-apple-touch.png') }}">

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700" rel="stylesheet" />
    <script src="{{ asset('js/jquery.min.js') }}"></script>
    @routes
    @if (app()->environment('local'))
        @viteReactRefresh
    @endif
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    <script>
        // Ensure base URL is correctly set for assets
        window.baseUrl = '{{ url('/') }}';

        // Define asset helper function
        window.asset = function(path) {
            return "{{ asset('') }}" + path;
        };

        // Define storage helper function
        window.storage = function(path) {
            return "{{ asset('storage') }}/" + path;
        };

        // Set initial locale for i18next
        fetch('{{ route('initial-locale') }}')
            .then(response => response.text())
            .then(locale => {
                window.initialLocale = locale;
            })
            .catch(() => {
                window.initialLocale = 'en';
            });
    </script>
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>
