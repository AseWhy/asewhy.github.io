import ResponsibilityStyles from "./styles/Responsibility.module.scss"

export interface IResponsibilityProps {
    responsibility: string | {
        group: string;
        items: string[];
    }
}

export function Responsibility({ responsibility }: IResponsibilityProps) {
    if(typeof responsibility == 'string') {
        return <p>
            { responsibility }
        </p>
    } else {
        return <div
            className={ResponsibilityStyles.Responsibility}
        >
            <p>
                { responsibility.group }
            </p>

            <div
                className={ResponsibilityStyles.Childrens}
            >
                {
                    responsibility.items?.map(e => <Responsibility
                        responsibility={e}
                        key={e}    
                    />)
                }
            </div>
        </div>
    }
}