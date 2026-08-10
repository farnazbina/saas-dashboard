"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// ---------- Types ----------
type MemberStatus = "active" | "on-leave" | "probation";

interface TeamMember {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: MemberStatus;
}

interface Team {
    id: string;
    name: string;
    description: string;
    members: TeamMember[];
}

// ---------- Mock Data ----------
const teams: Team[] = [
    {
        id: "1",
        name: "Web Development",
        description: "Frontend & Backend",
        members: [
            {
                id: "m1",
                name: "Alice Johnson",
                email: "alice@example.com",
                phone: "+1 234 567 8901",
                status: "active",
            },
            {
                id: "m2",
                name: "Bob Smith",
                email: "bob@example.com",
                phone: "+1 234 567 8902",
                status: "on-leave",
            },
            {
                id: "m3",
                name: "Carol White",
                email: "carol@example.com",
                phone: "+1 234 567 8903",
                status: "probation",
            },
        ],
    },
    {
        id: "2",
        name: "Mobile App",
        description: "iOS & Android",
        members: [
            {
                id: "m4",
                name: "David Brown",
                email: "david@example.com",
                phone: "+1 234 567 8904",
                status: "active",
            },
            {
                id: "m5",
                name: "Eva Green",
                email: "eva@example.com",
                phone: "+1 234 567 8905",
                status: "active",
            },
        ],
    },
    {
        id: "3",
        name: "UI/UX Design",
        description: "User Experience & Interface",
        members: [
            {
                id: "m6",
                name: "Frank Miller",
                email: "frank@example.com",
                phone: "+1 234 567 8906",
                status: "on-leave",
            },
            {
                id: "m7",
                name: "Grace Lee",
                email: "grace@example.com",
                phone: "+1 234 567 8907",
                status: "active",
            },
        ],
    },
];

// ---------- Status Badge Component ----------
const STATUS_LABELS: Record<MemberStatus, string> = {
    active: "Active",
    "on-leave": "On Leave",
    probation: "Probation",
};

const STATUS_COLORS: Record<MemberStatus, string> = {
    active: "bg-green-100 text-green-800 border-green-300",
    "on-leave": "bg-yellow-100 text-yellow-800 border-yellow-300",
    probation: "bg-blue-100 text-blue-800 border-blue-300",
};

function StatusBadge({ status }: { status: MemberStatus }) {
    return (
        <Badge variant="outline" className={cn("text-xs font-medium", STATUS_COLORS[status])}>
            {STATUS_LABELS[status]}
        </Badge>
    );
}

// ---------- Member Card ----------
function MemberCard({ member }: { member: TeamMember }) {
    const initials = member.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <Card className="mb-3 shadow-sm">
            <CardContent className="p-4 space-y-2">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`} />
                            <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h4 className="font-semibold text-sm">{member.name}</h4>
                            <p className="text-xs text-muted-foreground">{member.email}</p>
                        </div>
                    </div>
                    <StatusBadge status={member.status} />
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <span>📞</span>
                    <span>{member.phone}</span>
                </div>
            </CardContent>
        </Card>
    );
}

// ---------- Team Column ----------
function TeamColumn({ team }: { team: Team }) {
    return (
        <Card className="flex-1 min-w-[250px]">
            <CardHeader className="py-3 px-4 border-b">
                <CardTitle className="text-sm font-medium">{team.name}</CardTitle>
                <p className="text-xs text-muted-foreground">{team.description}</p>
                <div className="text-xs text-muted-foreground mt-1">
                    {team.members.length} member{team.members.length !== 1 && "s"}
                </div>
            </CardHeader>
            <CardContent className="p-3 max-h-[600px] overflow-y-auto">
                {team.members.map((member) => (
                    <MemberCard key={member.id} member={member} />
                ))}
                {team.members.length === 0 && (
                    <div className="text-sm text-muted-foreground text-center py-8">
                        No members in this team
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

// ---------- Main Page ----------
export default function TeamsPage() {
    return (
        <div className="py-6">
            <h1 className="text-2xl font-bold mb-6">Teams</h1>
            <div className="flex flex-wrap gap-4">
                {teams.map((team) => (
                    <TeamColumn key={team.id} team={team} />
                ))}
            </div>
        </div>
    );
}