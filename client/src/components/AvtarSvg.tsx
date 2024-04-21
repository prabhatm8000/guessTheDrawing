interface AvtarSvgProps {
    className?: string;
    color?: string;
}

const AvtarSvg = ({ className = "w-[24px] h-[24px]", color = "#000" }: AvtarSvgProps) => {
    return (
        <div className={className + " rounded-full bg-stone-100 overflow-hidden"}>
            <svg
            className="translate-y-2"
                viewBox="0 0 8.4666665 10.583333625"
                version="1.1"
                x="0px"
                y="0px"
            >
                <g transform="translate(0,-288.53332)">
                    <path
                        d="m 4.3627833,289.19581 c -1.5615418,0 -2.8334072,1.23275 -2.901114,2.77813 l 0.6898799,0 a 1.0583335,1.0583336 0 0 1 1.023194,-0.79375 1.0583335,1.0583336 0 0 1 1.056267,0.99528 l 0.00516,0 a 1.0583335,1.0583336 0 0 1 1.0552325,-0.99528 1.0583335,1.0583336 0 0 1 1.02371,0.79375 l 0.6909144,0 c 0.00106,-1.47574 -1.1546232,-2.70719 -2.6432511,-2.77813 z"
                        style={{
                            opacity: 1,
                            fill: color,
                            fillOpacity: 1,
                            stroke: "none",
                            strokeWidth: 0.99999994,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeMiterlimit: 4,
                            strokeDasharray: "none",
                            strokeOpacity: 1,
                        }}
                    />
                    <path
                        d="m 4.2299756,292.30156 a 1.0583335,1.0583336 0 0 1 -1.0552324,0.99529 1.0583335,1.0583336 0 0 1 -1.02371,-0.79375 l -0.6955658,0 0.00413,3.83439 5.5515988,0 -0.00413,-3.83439 -0.6924649,0 a 1.0583335,1.0583336 0 0 1 -1.023194,0.79375 1.0583335,1.0583336 0 0 1 -1.056267,-0.99529 z m -1.6536458,2.05362 3.3134936,0 a 1.6607437,1.610231 0 0 1 -0.1235075,0.51728 l -3.0669946,0 a 1.6607437,1.610231 0 0 1 -0.1229915,-0.51728 z m 0.2656178,0.78187 2.781742,0 a 1.6607437,1.610231 0 0 1 -1.3895785,0.7338 1.6607437,1.610231 0 0 1 -1.3921635,-0.7338 z"
                        style={{
                            opacity: 1,
                            fill: color,
                            fillOpacity: 1,
                            stroke: "none",
                            strokeWidth: 0.99999994,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeMiterlimit: 4,
                            strokeDasharray: "none",
                            strokeOpacity: 1,
                        }}
                    />
                    <path
                        d="m 3.1747432,291.7755 a 0.46302103,0.46302107 0 0 0 -0.4630208,0.46302 0.46302103,0.46302107 0 0 0 0.4630208,0.46302 0.46302103,0.46302107 0 0 0 0.4630208,-0.46302 0.46302103,0.46302107 0 0 0 -0.4630208,-0.46302 z m 0.066146,0.26458 a 0.13229167,0.13229168 0 0 1 0.1322917,0.13229 0.13229167,0.13229168 0 0 1 -0.1322917,0.13229 0.13229167,0.13229168 0 0 1 -0.1322916,-0.13229 0.13229167,0.13229168 0 0 1 0.1322916,-0.13229 z"
                        style={{
                            opacity: 1,
                            fill: color,
                            fillOpacity: 1,
                            stroke: "none",
                            strokeWidth: 0.9999999,
                            strokeLinecap: "butt",
                            strokeLinejoin: "round",
                            strokeMiterlimit: 4,
                            strokeDasharray: "none",
                            strokeOpacity: 1,
                        }}
                    />
                    <path
                        d="m 5.2914099,291.7755 a 0.46302103,0.46302107 0 0 0 -0.4630208,0.46302 0.46302103,0.46302107 0 0 0 0.4630208,0.46302 0.46302103,0.46302107 0 0 0 0.4630209,-0.46302 0.46302103,0.46302107 0 0 0 -0.4630209,-0.46302 z m 0.066146,0.26458 a 0.13229167,0.13229168 0 0 1 0.1322916,0.13229 0.13229167,0.13229168 0 0 1 -0.1322916,0.13229 0.13229167,0.13229168 0 0 1 -0.1322917,-0.13229 0.13229167,0.13229168 0 0 1 0.1322917,-0.13229 z"
                        style={{
                            opacity: 1,
                            fill: color,
                            fillOpacity: 1,
                            stroke: "none",
                            strokeWidth: 0.9999999,
                            strokeLinecap: "butt",
                            strokeLinejoin: "round",
                            strokeMiterlimit: 4,
                            strokeDasharray: "none",
                            strokeOpacity: 1,
                        }}
                    />
                </g>
            </svg>
        </div>
    );
};

export default AvtarSvg;
