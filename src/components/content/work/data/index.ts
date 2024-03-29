import { REF_WORK_START_DATE } from "../../../../service";

import RecodeLogo from "../assets/recode.svg";
import BifitLogo from "../assets/bifit.svg";

export const Experiance = [
    {
        name: "Recode team",
        project: "https://kv.burmistr.ru",
        location: "Тольятти",
        sphere: "Разработка программного обеспечения",
        site: "http://recode.team",
        logo: RecodeLogo,
        dateStart: REF_WORK_START_DATE,
        dateEnd: new Date(2023, 6, 14),
        responsibilities: [
            "Создание и сопровождение баз данных PostgreSQL; Создание и сопровождение микросервисов и микрофронтендов Spring + React",
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
            }
        ]
    },
    {
        name: "БИФИТ",
        project: "https://www.bifit.ru/ru/distribute/index.html",
        location: "Москва",
        color: "skyblue",
        sphere: "Разработка платформы для дистанционного банковского обслуживания:",
        site: "https://www.bifit.ru",
        logo: BifitLogo,
        dateStart: new Date(2023, 6, 23),
        dateEnd: new Date(),
        responsibilities: [
            {
                group: "Разработка и сопровождение высоконагруженной системы ДБО ibank2 (для ИП и ЮР лиц)",
                items: [
                    "Подготовка обновлений системы",
                    "Подготовка кастомных соборок системы",
                    "Работа с интеграцией внешних сервисов",
                    "Разработка нового функцианала системы по ТЗ (Java, TS (Vue))",
                    "Разработка и сопровождение баз данных (Postgresql, Oracle, Mssql)",
                    "Работа с legacy (Java / TS)",
                    "Испрвление ошибок"
                ]
            },
            "Написание инструментов для разработки и тестирования",
            "Написание скриптов по запросам клиентов",
            "Работа с БТ (Mantis)",
            "Работа с git (Gerrit)",
        ]
    }
]