import { Stack } from "./stack";

import StackViewModule from "./StackView.module.scss";

export function StackView() {
    return <div className={StackViewModule.container}>
        <div className={StackViewModule.track}>
            {
                [ ...Stack, ...Stack ].map((item, i) => <div
                    key={i}
                    className={StackViewModule.logo}
                >
                    <img
                        src={item}
                        className={StackViewModule.sponsor}
                        alt=""
                        aria-hidden={i >= Stack.length}
                    />
                </div>)
            }
        </div>
    </div>;
}
