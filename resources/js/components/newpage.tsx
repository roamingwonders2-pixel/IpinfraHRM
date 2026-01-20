import { AppSidebar } from '@/components/app-sidebar';

export default function Home() {
    return (
        <div className="flex min-h-screen bg-background">
            {/* Sidebar */}
            <AppSidebar />

            {/* Main Content */}
            <main className="flex-1 p-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-lg border bg-card">
                            <h2 className="text-lg font-semibold">Employees</h2>
                            <p className="text-muted-foreground mt-2">
                                Manage all employees from here.
                            </p>
                        </div>

                        <div className="p-6 rounded-lg border bg-card">
                            <h2 className="text-lg font-semibold">Leave Requests</h2>
                            <p className="text-muted-foreground mt-2">
                                View and approve leave applications.
                            </p>
                        </div>

                        <div className="p-6 rounded-lg border bg-card">
                            <h2 className="text-lg font-semibold">Attendance</h2>
                            <p className="text-muted-foreground mt-2">
                                Track daily attendance records.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
