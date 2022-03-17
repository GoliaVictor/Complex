
/**
 * A complex number class for storing a complex number with related functions.
 * Create one using .cartesian(re, im) or .modArg(mod, arg)
 */
class Complex {

    /**
     * Creates a complex number with given modulus and argument (magnitude and direction of its vector).
     * @param {Float} mod Modulus of complex number (magnitude of its vector); >= 0.
     * @param {Float} arg Argument of complex number (direction of its vector); Radians.
     * @returns Instance of Complex class.
     */
     static modArg(mod, arg) {
        const re = mod * Math.cos(arg)
        const im = mod * Math.sin(arg)

        return new Complex(re, im)
    }

    /**
     * Creates a complex number with given real and imaginary parts (components of its vector).
     * @param {Float} re Real part of complex number (x component of its vector).
     * @param {Float} im Imaginary part of complex number (y component of its vector).
     * @returns Instance of Complex class.
     */
    static cartesian(re=1, im=1) {
        return new Complex(re, im)
    }
    
    constructor (re, im) {
        this.re = re;
        this.im = im;
        this.mod = Math.sqrt(re**2 + im**2)
        this.arg = Math.atan2(im, re)
        this.argitop = this.arg / Math.PI // Argument as multiple of pi
    }

    // Functions that modify this instance:
    /**
     * Sets the modulus of the complex number (magnitude of its vector).
     * Modifies existing instance.
     * @param {Float} newMod New modulus to change to; >= 0.
     */
    setMod(newMod) {
        this.re = this.re / this.mod * newMod
        this.im = this.im / this.mod * newMod
        this.mod = newMod
    }

    /**
     * Sets the argument of the complex number (angle it makes with the positive real axis).
     * Modifies existing instance.
     * @param {Float} newArg New argument to change to.
     */
    setArg(newArg) {
        this.re = this.mod * Math.cos(newArg)
        this.im = this.mod * Math.sin(newArg)
        this.arg = newArg
        this.argitop = newArg / Math.PI
    }

    // Functions that don't modify this instance:
    /**
     * Multiplies both complex numbers together.
     * Does not modify original instance.
     * @param {Complex} otherNum Complex number to multiply with.
     * @returns New instance of Complex
     */
    multiplyBy(otherNum) {
        let newNum = new Complex()
        newNum.setMod(this.mod * otherNum.mod)
        newNum.setArg((this.argitop + otherNum.argitop) * Math.PI)
        return newNum;
    }

    /**
     * Divides the first complex number by the second.
     * Does not modify original instance.
     * @param {Complex} otherNum Complex number to divide by.
     * @returns New instance of Complex
     */
    divideBy(otherNum) {
        let newNum = new Complex()
        newNum.setMod(this.mod / otherNum.mod)
        newNum.setArg((this.argitop - otherNum.argitop) * Math.PI)
        return newNum;
    }

    /**
     * Subtracts the second complex number from the first.
     * Does not modify original instance.
     * @param {Complex} otherNum Complex number to subtract.
     * @returns New instance of Complex
     */
    minus(otherNum) {
        return new Complex(this.re - otherNum.re, this.im - otherNum.im);
    }

    /**
     * Adds both complex numbers together.
     * Does not modify original instance.
     * @param {Complex} otherNum Complex number to add.
     * @returns New instance of Complex
     */
    plus(otherNum) {
        return new Complex(this.re + otherNum.re, this.im + otherNum.im);
    }

    /**
     * Raises the first complex number by a certain power/index/exponent.
     * Does not modify original instance.
     * @param {Float} power Power to raise by.
     * @returns New instance of Complex
     */
    pow(power) {
        let newNum = new Complex()
        newNum.setMod(this.mod ** power)
        newNum.setArg(this.arg *= power)
        return newNum
    }

    /**
     * Converts the complex number to a human-readable format
     * @param {String} form Optional. Form to return the complex number as: cartesian, modArg, modArgitop, euler, euleritop.
     * Append 'S' to get simplified version.
     * Empty input returns simplified cartesian form.
     * @returns String
     */
    toString(form="cartesianS") {
        if (this.mod == 0) {
            // Mod is 0
            return '0'
        }
        switch (form) {

            // Cartesian Form
            case "cartesian":
                return `${this.re} + ${this.im}i`
            case "cartesianS":
                if (this.re == 0) {
                    // Re is 0
                    if (this.im == 0) {
                        // Re is 0, Im is 0
                        return `0`
                    }
                    else if (this.im == 1) {
                        // Re is 0, Im is 1
                        return `i`
                    }
                    else {
                        // Re is 0, Im is neither 0 nor 1
                        return `${this.im}i`
                    }
                }
                else {
                    // Re is not 0
                    if (this.im == 0) {
                        // Re is not 0, Im is 0
                        return `${this.re}`
                    }
                    else if (this.im == 1) {
                        // Re is not 0, Im is 1
                        return `${this.re} + i`
                    }
                    else if (this.im == -1) {
                        // Re is not 0, Im is -1
                        return `${this.re} - i`
                    }
                    else if (this.im < 0) {
                        // Re is not 0, Im is negative
                        return `${this.re} - ${Math.abs(this.im)}i`
                    }
                    else {
                        // Re is not 0, Im is neither 0 nor 1 nor -1 nor < 0
                        return `${this.re} + ${this.im}i`
                    }
                }
            
            // Modulus-Argument / Polar Form
            case "modArg":
                return `${this.mod}(cos(${this.arg}) + isin(${this.arg}))`;

            case "modArgS":
                if (this.mod == 1) {
                    // Mod is 1
                    return `cos(${this.arg}) + isin(${this.arg})`;
                }
                else {
                    // Mod is not 1
                    return `${this.mod}(cos(${this.arg}) + isin(${this.arg}))`;
                }
            
            case "modArgitop":
                return `${this.mod}(cos(${this.argitop}π) + isin(${this.argitop}π))`;

            case "modArgitopS":
                if (this.mod == 1) {
                    // Mod is 1
                    if (this.argitop == 1) {
                        return `cos(π) + isin(π)`;
                    }
                    else if (this.argitop == -1) {
                        return `cos(-π) + isin(-π)`;
                    }
                    else if (this.argitop == 0) {
                        return `cos(0) + isin(0)`;
                    }
                    else {
                        return `cos(${this.argitop}π) + isin(${this.argitop}π)`;
                    }
                }
                else {
                    // Mod is not 1
                    if (this.argitop == 1) {
                        return `${this.mod}(cos(π) + isin(π))`;
                    }
                    else if (this.argitop == -1) {
                        return `${this.mod}(cos(-π) + isin(-π))`;
                    }
                    else if (this.argitop == 0) {
                        return `${this.mod}(cos(0) + isin(0))`;
                    }
                    else {
                        return `${this.mod}(cos(${this.argitop}π) + isin(${this.argitop}π))`;
                    }
                }

            // Euler Form
            case "euler":
                return `${this.mod}e^(${this.arg}i)`;

            case "eulerS":
                if (this.mod == 1) {
                    // Mod is 1
                    if (this.arg == 1) {
                        return `e^i`;
                    }
                    else if (this.arg == -1) {
                        return `e^(-i)`
                    }
                    else if (this.arg == 0) {
                        return `e^0`
                    }
                    else {
                        // Arg is not 1
                        return `e^(${this.arg}i)`;
                    }
                }
                else {
                    // Mod is not 1
                    if (this.arg == 1) {
                        // Arg is 1
                        return `${this.mod}e^i`;
                    }
                    else if (this.arg == -1) {
                        return `${this.mod}e^(-i)`
                    }
                    else if (this.arg == 0) {
                        return `${this.mod}e^0`
                    }
                    else {
                        // Arg is not 1
                        return `${this.mod}e^(${this.arg}i)`;
                    }
                }

            case "euleritop":
                return `${this.mod}e^(${this.argitop}πi)`;
            case "euleritopS":
                if (this.mod == 1) {
                    // Mod is 1
                    if (this.argitop == 1) {
                        // Argitop is 1
                        return `e^(πi)`;
                    }
                    else if (this.argitop == -1) {
                        return `e^(-πi)`
                    }
                    else if (this.argitop == 0) {
                        return `e^0`
                    }
                    else {
                        // Argitop is not 1
                        return `e^(${this.argitop}πi)`;
                    }
                }
                else {
                    // Mod is not 1
                    if (this.argitop == 1) {
                        // Argitop is 1
                        return `${this.mod}e^(πi)`;
                    }
                    else if (this.argitop == -1) {
                        return `${this.mod}e^(-πi)`
                    }
                    else if (this.argitop == 0) {
                        return `${this.mod}e^0`
                    }
                    else {
                        // Argitop is not 1
                        return `${this.mod}e^(${this.argitop}πi)`;
                    }
                }
        }
    }
}