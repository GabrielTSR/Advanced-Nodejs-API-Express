export const env = {
    facebokApi: {
        clientId: process.env.FB_CLIENT_ID ?? '613268970189523',
        clientSecret:
            process.env.FB_CLIENT_SECRET ?? '28f173b04370c1c8ed13a28ac37ec7d5',
        token: 'EAAItw88estMBAFT3zzesbajAT3nVqMQArN9rZCe2er3718TmQNdMk5ox9FZAgBmSwMsu30zsRVzZCDaoFfSZCvIZC3EKHFk8WiBVSVyWM3kg6OFJ9G8Prg3XdBwGujCxhrslRoFnlHJM81BgcrzGR72h7XzTiIuhNHc1FPc2Rp1WD9sB0ubzwcUoV5t7GnzDANG3ov5ktVAZDZD',
    },
    appPort: process.env.PORT ?? 3333,
}
