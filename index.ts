const formats = {
    RELATIVE: 'R',
    DATE: 'D',
    TIME: 'T',
    SHORT_TIME: 't',
    FULL: 'F'
} as const;

export const discordTimestamps = {
    fromDate: function (date: number, format: keyof typeof formats = 'FULL'): string {
        if (typeof date !== 'number') {
            throw new Error('The date must be a number')
        }
        let parsed = Math.floor(date / 1000)
        return `<t:${parsed}:${formats[format]}>`
    },
    
    now: function (format: keyof typeof formats = 'FULL'): string {
        return `<t:${Math.floor(Date.now() / 1000)}:${formats[format]}>`
    },
    
    fromNow: function (ms: number, format: keyof typeof formats = 'FULL'): string {
        if (typeof ms !== 'number') {
            throw new Error('The ms must be a number')
        }
        return `<t:${Math.floor((Date.now() + ms) / 1000)}:${formats[format]}>`
    }
}
