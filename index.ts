const formats = {
    RELATIVE: 'R',
    DATE: 'D',
    TIME: 'T',
    SHORT_TIME: 't',
    FULL: 'F'
} as const;

export const discordTimestamps = {
    /**
     * Converts a timestamp to a Discord timestamp string
     * @param date The date to convert to a Discord timestamp (in milliseconds)
     * @param format The format of the timestamp 
     * @example discordTimestamps.fromDate(1620000000000, 'FULL')
     * @returns The Discord timestamp string (e.g. <t:1620000000:R>)
     */
    fromDate: function (date: number, format: keyof typeof formats = 'FULL'): string {
        if (typeof date !== 'number') {
            throw new Error('The date must be a number')
        }
        if (Object.keys(formats).includes(format) === false) {
            throw new Error(`Expected a valid format ${Object.keys(formats).join(', ')} but got ${format}`)
        }
        let parsed = Math.floor(date / 1000)
        return `<t:${parsed}:${formats[format]}>`
    },    
    /**
     * Converts the current date to a Discord timestamp string
     * @param format The format of the timestamp 
     * @example discordTimestamps.now('FULL')
     * @returns The Discord timestamp string (e.g. <t:1620000000:R>)
     */
    now: function (format: keyof typeof formats = 'FULL'): string {
        if (Object.keys(formats).includes(format) === false) {
            throw new Error(`Expected a valid format ${Object.keys(formats).join(', ')} but got ${format}`)
        }
        return `<t:${Math.floor(Date.now() / 1000)}:${formats[format]}>`
    },
    /**
     * Converts a timestamp from now to a Discord timestamp string
     * @param ms The milliseconds from now
     * @param format The format of the timestamp 
     * @example discordTimestamps.fromNow(60000, 'FULL')
     * @returns The Discord timestamp string (e.g. <t:1620000000:R>)
     */   
    fromNow: function (ms: number, format: keyof typeof formats = 'FULL'): string {
        if (typeof ms !== 'number') {
            throw new Error('The ms must be a number')
        }
        if (Object.keys(formats).includes(format) === false) {
            throw new Error(`Expected a valid format ${Object.keys(formats).join(', ')} but got ${format}`)
        }
        
        return `<t:${Math.floor((Date.now() + ms) / 1000)}:${formats[format]}>`
    }
}

export const numbers = {
    /**
     * Checks if a number is even
     * @param num The number to check if it is even
     * @returns A boolean indicating if the number is even
     */
    isEven: function (num: number): boolean {
        if (typeof num !== 'number') {
            throw new Error('The num must be a number')
        }
        return num % 2 === 0
    },
    /**
     * Checks if a number is odd
     * @param num The number to check if it is odd
     * @returns A boolean indicating if the number is odd
     */
    isOdd: function (num: number): boolean {
        if (typeof num !== 'number') {
            throw new Error('The num must be a number')
        }
        return num % 2 !== 0
    },
    /**
     * Checks if a number is a prime number
     * @param num The number to check if it is a prime number
     * @returns A boolean indicating if the number is a prime number
     */
    isPrime: function (num: number): boolean {
        if (typeof num !== 'number') {
            throw new Error('The num must be a number')
        }
        if (num < 2) return false
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false
        }
        return true
    },
    /**
     * Generates a random number between two numbers
     * @param min The minimum number
     * @param max The maximum number
     * @example numbers.random(1, 10)
     * @returns A random number between the min and max
     */
    random: function (min: number, max: number): number {
        if (typeof min !== 'number' || typeof max !== 'number') {
            throw new Error('The min and max must be numbers')
        }
        return Math.floor(Math.random() * (max - min + 1)) + min
    },
    /**
     * Calculates the average of numbers
     * @param numbers The numbers to calculate the average
     * @returns The average of the numbers
     * @example numbers.average(1, 2, 3, 4, 5)
     * @returns 3
     * @example numbers.average(1, 2, 3, 4, 5, 'a')
     * @returns Error: All the arguments must be numbers
     * @example numbers.average(1, 2, 3, 4, 5, 6)
     * @returns 3.5
     * @returns The average of the numbers
     */
    average: function (...numbers: number[]): number {
        if (numbers.some(n => typeof n !== 'number')) {
            throw new Error('All the arguments must be numbers')
        }
        return numbers.reduce((a, b) => a + b) / numbers.length
    },
    /**
     * Calculates the greatest common divisor of two numbers
     * @param a The first number
     * @param b The second number
     * @returns The greatest common divisor of the two numbers
     * @example numbers.gdc(12, 18)
     * @returns 6
     */
    gdc: function (a: number, b: number): number {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new Error('The a and b must be numbers')
        }
        return b === 0 ? a : numbers.gdc(b, a % b)
    },
    /**
     * Calculates the greatest common divisor of an array of numbers
     * @param numbers The array of numbers
     * @returns The greatest common divisor of the numbers
     * @example numbers.gdcArray([12, 18, 24])
     * @returns 6
     */
    gdcArray: function (numbers: number[]): number {
        if (numbers.some(n => typeof n !== 'number')) {
            throw new Error('All the arguments must be numbers')
        }
        return numbers.reduce((a, b) => this.gdc(a, b))
    },
    /**
     * Calculates the least common multiple of two numbers
     * @param a The first number
     * @param b The second number
     * @returns The least common multiple of the two numbers
     * @example numbers.lcm(12, 18)
     * @returns 36
     */
    lcm: function (a: number, b: number): number {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new Error('The a and b must be numbers')
        }
        return Math.abs(a * b) / numbers.gdc(a, b)
    },
    /**
     * Calculates the least common multiple of an array of numbers
     * @param numbers The array of numbers
     * @returns The least common multiple of the numbers
     * @example numbers.lcmArray([12, 18, 24])
     * @returns 72
     */
    lcmArray: function (numbers: number[]): number {
        if (numbers.some(n => typeof n !== 'number')) {
            throw new Error('All the arguments must be numbers')
        }
        return numbers.reduce((a, b) => this.lcm(a, b))
    }        
}

export const colors = {
    rgbToHex: function (r: number, g: number, b: number): string {
        if (typeof r !== 'number' || typeof g !== 'number' || typeof b !== 'number') {
            throw new Error('The r, g and b must be numbers')
        }
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
    },
    hexToRgb: function (hex: string): { r: number, g: number, b: number } {
        if (typeof hex !== 'string') {
            throw new Error('The hex must be a string')
        }
        let bigint = parseInt(hex.replace('#', ''), 16)
        return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 }
    },
    randomHex: function (): string {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`
    },
    randomRgb: function (): { r: number, g: number, b: number } {
        return { r: Math.floor(Math.random() * 255), g: Math.floor(Math.random() * 255), b: Math.floor(Math.random() * 255) }
    },    
    hslToRgb: function (h: number, s: number, l: number): { r: number, g: number, b: number } {
        if (typeof h !== 'number' || typeof s !== 'number' || typeof l !== 'number') {
            throw new Error('The h, s and l must be numbers')
        }
        s /= 100;
        l /= 100;
    
        const k = (n: number) => (n + h / 30) % 12;
        const a = s * Math.min(l, 1 - l);
        const f = (n: number) => l - a * Math.max(Math.min(k(n) - 3, 9 - k(n), 1), -1);
    
        return {
            r: Math.round(f(0) * 255),
            g: Math.round(f(8) * 255),
            b: Math.round(f(4) * 255)
        };
    },
    rgbToHsl: function(r: number, g: number, b: number): { h: number, s: number, l: number } {
        if (typeof r !== 'number' || typeof g !== 'number' || typeof b !== 'number') {
            throw new Error('The r, g and b must be numbers')
        }
        r /= 255;
        g /= 255;
        b /= 255;
    
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const delta = max - min;
        let h = 0, s = 0, l = (max + min) / 2;
    
        if (delta !== 0) {
            s = delta / (1 - Math.abs(2 * l - 1));
    
            switch (max) {
                case r: h = ((g - b) / delta) % 6; break;
                case g: h = (b - r) / delta + 2; break;
                case b: h = (r - g) / delta + 4; break;
            }
    
            h = Math.round(h * 60);
            if (h < 0) h += 360;
        }
    
        return {
            h: Math.round(h),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    },
    randomHsl: function(): { h: number, s: number, l: number } {
        return { h: Math.floor(Math.random() * 360), s: Math.floor(Math.random() * 100), l: Math.floor(Math.random() * 100) }
    },
    hexToHsl: function(hex: string): { h: number, s: number, l: number } {
        if (typeof hex !== 'string') {
            throw new Error('The hex must be a string')
        }
        const { r, g, b } = colors.hexToRgb(hex);
        return colors.rgbToHsl(r, g, b);
    },
    hslToHex: function(h: number, s: number, l: number): string {
        if (typeof h !== 'number' || typeof s !== 'number' || typeof l !== 'number') {
            throw new Error('The h, s and l must be numbers')
        }
        const { r, g, b } = colors.hslToRgb(h, s, l);
        return colors.rgbToHex(r, g, b);
    },
   

    
}