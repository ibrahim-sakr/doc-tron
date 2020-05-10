export default {
    interval: parseInt(process.env.SCHEDULER_INTERVAL || '60000'),
    coefficient: JSON.parse(process.env.SCHEDULER_COEFFICIENT || '[3, 3]')
}