
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { services } from "@/lib/data";
import { BarChart, Eye, Heart, DollarSign, Users, LineChart, Activity } from "lucide-react";
import { Bar, BarChart as RechartsBarChart, Line, LineChart as RechartsLineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const chartData = [
  { name: 'Jan', views: 4000, likes: 2400, revenue: 2400 },
  { name: 'Feb', views: 3000, likes: 1398, revenue: 2210 },
  { name: 'Mar', views: 2000, likes: 9800, revenue: 2290 },
  { name: 'Apr', views: 2780, likes: 3908, revenue: 2000 },
  { name: 'May', views: 1890, likes: 4800, revenue: 2181 },
  { name: 'Jun', views: 2390, likes: 3800, revenue: 2500 },
  { name: 'Jul', views: 3490, likes: 4300, revenue: 2100 },
];

export default function DashboardPage() {
    const { user, role } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (role !== 'provider') {
            router.push('/');
        }
    }, [role, router]);

    if (role !== 'provider' || !user) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <p>Loading or redirecting...</p>
            </div>
        );
    }

    const providerServices = services.filter(s => s.provider.username === user.username);
    const totalViews = providerServices.reduce((acc, s) => acc + (s.analytics?.views ?? 0), 0);
    const totalLikes = providerServices.reduce((acc, s) => acc + (s.analytics?.likes ?? 0), 0);
    const totalRevenue = providerServices.reduce((acc, s) => acc + (s.analytics?.revenue ?? 0), 0);


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <BarChart className="h-8 w-8 text-primary" />
        <h1 className="text-4xl font-bold font-headline">Provider Dashboard</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+180.1% from last month</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{totalLikes.toLocaleString()}</div>
                 <p className="text-xs text-muted-foreground">+19% from last month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Followers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+235</div>
                <p className="text-xs text-muted-foreground">since last month</p>
            </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="col-span-full">
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <LineChart className="h-5 w-5"/>
                    Monthly Performance
                </CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                    <RechartsLineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'hsl(var(--background))',
                                border: '1px solid hsl(var(--border))',
                                color: 'hsl(var(--foreground))'
                            }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="views" stroke="hsl(var(--secondary-foreground))" />
                    </RechartsLineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
