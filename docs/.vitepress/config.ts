export default {
    themeConfig: {
        sidebar: [
            {
                text: 'Projektübersicht',
                items: [
                    { text: 'Einführung', link: '/overview/introduction' }
                ]
            },
            {
                text: 'Systemarchitektur',
                items: [
                    { text: 'Überblick', link: '/architecture/system-overview' },
                    { text: 'Frontend', link: '/architecture/frontend' },
                    { text: 'Backend', link: '/architecture/backend' },
                    { text: 'Telegram Bot', link: '/architecture/bot' }
                ]
            },
            {
                text: 'Daten',
                items: [
                    { text: 'Datenflüsse', link: '/data/data-flow' },
                    { text: 'Datenbankschema', link: '/data/database-schema' }
                ]
            },
            {
                text: 'Konzepte',
                items: [
                    { text: 'Zentrale Konzepte', link: '/concepts/core-concepts' }
                ]
            },
            {
                text: 'Repositories',
                items: [
                    { text: 'Client', link: '/repositories/client' },
                    { text: 'Backend', link: '/repositories/backend' },
                    { text: 'Telegram Bot', link: '/repositories/telegram-bot' }
                ]
            },
            {
                text: 'Ausblick',
                items: [
                    { text: 'Future Work', link: '/future/future-work' }
                ]
            }
        ]
    }
}
