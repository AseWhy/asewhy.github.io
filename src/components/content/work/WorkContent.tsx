import { parse } from "date-fns";
import WorkContentStyles from "./styles/WorkContent.module.scss"
import RecodeLogo from "./assets/recode.svg";
import { WorkPlace } from "./WorkPlace";

const EXPERIANCE = [
    {
        name: "Recode team",
        project: "https://kv.burmistr.ru",
        location: "Тольятти",
        sphere: "Разработка программного обеспечения",
        site: "http://recode.team",
        logo: RecodeLogo,
        dateStart: parse("21.01.2021", "dd.mm.yyyy", new Date()),
        dateEnd: new Date(),
        responsibilities: [
            "Создание и сопровождение баз данных PostgreSQL; Создание и сопровождение микросервисов и микрофронтендов Spring + React",
            "Перенос уже имеющейся разработки (PHP) на микросервисы",
            {
                group: "Разработка React приложений",
                items: [
                    "Работа с Typescript",
                    "Работа с Javascpt",
                    "Инициализация и настройка React приложения",
                    "Работа с Хуками (ну то есть я в основном на них и писал)",
                    "Реализация клиент-серверного взаимодействия",
                    "Работа с Mobx (в бибилиотеке mobx-state-tree)",
                    "Работа с веб сокетами (ws или SockJs) over (Stomp)",
                    "Разработка модуля компонентов (ну чтобы их можно было использовать в разных проектах)"
                ]
            },
            {
                group: "Разработка Spring Boot приложений",
                items: [
                    "Работа с SMTP из под java",
                    "Работа с Flyway (Миграции)",
                    "AOP",
                    "Eureka",
                    "Работа с сокетами (Stomp)",
                    "Написание тестов",
                    "Работа с Kafka",
                    "Разработка основного функционала сервисов по ТЗ (взаимодействие между сервисами, работа с БД, работа с конвертерами сообщений и т.д.)",
                    "Развертывание приложений в Docker"
                ]
            },
            {
                group: "Параллельно, работа над самим монолитом (CRM), не прекращалась",
                items: [
                    "Интеграция с СМС центром (сервис рассылки такой)",
                    "Работа с SMTP",
                    "Исправление мелких ошибок"
                ]
            }
        ]
    }
]

export function WorkContent() {
    return <div
        className={WorkContentStyles.WorksContent}
        id="work"
    >
        <h2> Опыт работы </h2>

        <p>
            За время своего существования я успел поработать в некоторых местах (на самом деле пока в одном)), ниже приведен список этих мест, 
            с подробной информацией о каждом из мест работы.
        </p>

        <div
            className={WorkContentStyles.WorksList}
        >
            {
                EXPERIANCE.map(e => <WorkPlace
                    {...e}
                    key={e.name}
                />)
            }
        </div>
    </div>
}