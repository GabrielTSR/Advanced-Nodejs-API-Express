export const env = {
    facebokApi: {
        clientId: process.env.FB_CLIENT_ID ?? '613268970189523',
        clientSecret:
            process.env.FB_CLIENT_SECRET ?? '28f173b04370c1c8ed13a28ac37ec7d5',
        token: 'EAAItw88estMBAOxZBZBltnZBPaFZCsqtt6XLvCZBCTFFoRZBzgtegf8VjlJkZCyAYs7T4l7bzZCn6O788Vq7BB3ogXTR1TSZCsmafY811KBLKHwWRokRMEPL8ctZCOgAPZBtKnMlWEI0kEcGqYUZCMrzi4SrPuMgrWSpZCf3gk6sq0SgzVxQbPK4oxrMnk3mDhSISt1zQKBdtEBZAiXk0pKpIyOs3I',
    },
    appPort: process.env.PORT ?? 3333,
    jwtSecret:
        process.env.JWT_SECRET ??
        'vas123d7vf5327asdv12ads235nv6ad6421d7asnnrb4217as6dcfbr325as714f',
}
