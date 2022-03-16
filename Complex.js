
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
        this.argamop = this.arg / Math.PI // Argument as multiple of pi
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
        this.argamop = newArg / Math.PI
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
        newNum.setArg((this.argamop + otherNum.argamop) * Math.PI)
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
        newNum.setArg((this.argamop - otherNum.argamop) * Math.PI)
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
}