import marked from "marked"

export default function Expand(input){
    return input
            .replace(
                /^(#+)(.*)~\[([aA-zZаА-яЯёЁ_0-9]+)\]$/gm, 
                "$1 <span id='$3' class='marker'></span>$2\n"
            )
            .replace(
                />[ \t]*\[([^\]]+)\][ \t]*([аА-яЯёЁ0-9aA-zZ \t_]+)[ \t]*{([^}]*)}/gm, 
                (m, p1, p2, p3) => {
                    return `<li class="timeline" ${
                        p1 == '$' ? 'started="true"' : p1 == '#' ? 'ended="true"' : ''
                    }><div class="timeline-data-container"><code>${
                        p1 != '$' && p1 != '#' ? p1 : ''
                    }</code>${
                        p1 != '$' && p1 != '#' ? ' - ' : ''
                    }<strong>${
                        p2
                    }</strong><div class="timeline-description">${
                        marked(p3.trim())
                    }</div></div></li>`
                }
            ).replace(/{{(.*)}}/g, (m, p1) => {
                return eval(`(() => ${p1})();`);
            });
}