interface Props {
    active?: boolean
    payload?: Array<{value: number}>
}

export function ProjectChartToolTip({active, payload}: Props) {
    if(!active || !payload || payload.length === 0) return null
    return <div className="bg-primary p-1.5 px-2.5 rounded-lg shadow text-sm shadow-neutral-400">
        {payload[0].value} Projects
    </div>
}
