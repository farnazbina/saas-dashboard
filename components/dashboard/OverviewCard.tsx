import React from "react"

type Props = {
    title: string
    icon: React.ReactElement
    value: number | string
    progress: number | string
    label: string
    color: string
}

const OverviewCard = ({ title, icon, value, progress, label, color }: Props) => {
    return (
        <div className="rounded-lg flex flex-col bg-card border border-solid border-muted">
            <div className={`heading rounded-lg flex items-center px-5 py-7 gap-3 ${color}`}>
                {icon}
                <span className="text-white text-md font-medium">{title}</span>
            </div>
            <div className="heading rounded-xl flex flex-col px-5 pb-5 pt-4 gap-y-3">
                <span className="text-lg font-semibold">{value}</span>
                <div className="flex items-center gap-3">
                    <span className="block border border-solid border-success bg-success/10 text-sm text-success rounded-sm px-3">%{progress}</span>
                    <span>{label}</span>
                </div>
            </div>
        </div>
    )
}
export default OverviewCard