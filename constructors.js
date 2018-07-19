/**
 * Creates a generic spell that can be cast.
 *
 * @name Spell
 * @param {string} name         The name of the spell.
 * @param {number} cost         The amount needed to cast this spell.
 * @param {string} description  A short description of the spell.
 * @property {string} name
 * @property {number} cost
 * @property {string} description
 * @method   getDetails
 */
function Spell(name, cost, description){
        this.name = name;
        this.cost = cost;
        this.description = description;
     }
 


  /**
   * Returns a string of all of the spell's details.
   * The format doesn't matter, as long as it contains the spell name, cost, and description.
   *
   * @name getDetails
   * @return {string} details containing all of the spells information.
   */

   Spell.prototype.getDetails = function() {
       console.log("Name:" + this.name + " Cost:" + this.cost + " Description:" + this.description);
       return "Name:" + this.name + " Cost:" + this.cost + " Description:" + this.description;
   }


/**
 * A spell that deals damage.
 * We want to keep this code DRY (Don't Repeat Yourself).
 *
 * So you should use `Spell.call()` to assign the spell name, cost, and description.
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call
 *
 * In addition, you will also want to assign `DamageSpell.prototype`
 * a value so that it inherits from `Spell`.
 * Make sure to call this OUTSIDE of the function declaration.
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/prototype
 *
 * @name DamageSpell
 * @param {string} name         The name of the spell.
 * @param {number} cost         The amount needed to cast this spell.
 * @param {number} damage       The amount of damage this spell deals.
 * @param {string} description  A short description of the spell.
 * @property {string} name
 * @property {number} cost
 * @property {number} damage
 * @property {string} description
 */

 function DamageSpell(name, cost, damage, description) {
     this.damage = damage;
     Spell.call(this, name, cost, description);
 }

 DamageSpell.prototype = Object.create(Spell.prototype);

/**
 * Now that you've created some spells, let's create
 * `Spellcaster` objects that can use them!
 *
 * @name Spellcaster
 * @param {string} name         The spellcaster's name.
 * @param {number} health       The spellcaster's health points.
 * @param {number} mana         The spellcaster's mana points, used for casting spells.
 * @property {string} name
 * @property {number} health
 * @property {mana} mana
 * @property {boolean} isAlive  Default value should be `true`.
 * @method  inflictDamage
 * @method  spendMana
 * @method  invoke
 */

 function Spellcaster(name, health, mana) {
    this.name = name;
    this.health = health;
    this.mana = mana;
    this.isAlive = true;
 }

 Spellcaster.prototype.inflictDamage = function(damage) {
    if (this.health - damage <= 0) {
        this.health = 0;
        this.isAlive = false;
        console.log(this.isAlive)
    } else {
        this.health = this.health - damage;
    }
 }

 Spellcaster.prototype.spendMana = function(cost) {
     if(this.mana < cost) {
         this.mana = this.mana;
         console.log("Not enough mana to cast spell")
         return false;
     } else {
         this.mana = this.mana - cost;
         return true;
     }
 }

 

  /**
   * @method inflictDamage
   *
   * The spellcaster loses health equal to `damage`.
   * Health should never be negative.
   * If the spellcaster's health drops to 0,
   * its `isAlive` property should be set to `false`.
   *
   * @param  {number} damage  Amount of damage to deal to the spellcaster
   */

  /**
   * @method spendMana
   *
   * Reduces the spellcaster's mana by `cost`.
   * Mana should only be reduced only if there is enough mana to spend.
   *
   * @param  {number} cost      The amount of mana to spend.
   * @return {boolean} success  Whether mana was successfully spent.
   */

  /**
   * @method invoke
   *
   * Allows the spellcaster to cast spells.
   * The first parameter should either be a `Spell` or `DamageSpell`.
   * If it is a `DamageSpell`, the second parameter should be a `Spellcaster`.
   * The function should return `false` if the above conditions are not satisfied.
   *
   * You should use `instanceof` to check for these conditions.
   *
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof
   *
   * Next check if the spellcaster has enough mana to cast the spell.
   * If it can cast a spell, it should lose mana  equal to the spell's cost.
   * If there is not enough mana, return `false`.
   *
   * If there is enough mana to cast the spell, return `true`.
   * In addition, if it is a `DamageSpell` reduce the target's health by the spell's damage value.
   *
   * Use functions you've previously created: (`inflictDamage`, `spendMana`)
   * to help you with this.
   *
   * @param  {(Spell|DamageSpell)} spell  The spell to be cast.
   * @param  {Spellcaster} target         The spell target to be inflicted.
   * @return {boolean}                    Whether the spell was successfully cast.
   */

   Spellcaster.prototype.invoke = function(spell, target) {
       console.log(spell, "What is the initial spell?");
       if((spell instanceof(DamageSpell) === true) || (spell instanceof (Spell) === true)) {
           console.log(spell, "This is not null");
           if (spell instanceof(DamageSpell) === true) {
               console.log(spell, "this is a damage spell");
               if (target instanceof(Spellcaster) === true) {
                   console.log(target, "This is target");
                   if(this.mana >= spell.cost) {
                       console.log(spell.cost, "Cost of the spell you are casting");
                       console.log(spell.damage, "Damage of the spell you are casting");
                       console.log(this.spendMana, "spend mana function is real");
                       console.log(this.inflictDamage,"inflict damage function is real");
                       this.spendMana(spell.cost);
                       target.inflictDamage(spell.damage);
                       return true;
                   } else {
                       return false;
                   }
               } else {
                   return false;
               }
           } else if (spell instanceof(Spell) === true) {
               console.log(spell, "this is a regular spell");
               if(this.mana >= spell.cost) {
                this.spendMana(spell.cost);
                return true;
               } else {
                   return false;
               }
           } else {
               return false;
           }
       } else if (!spell) {
           console.log(spell, "this is not a spell");
           return false;
       } else {
           return false;
       }
   }

//   Spellcaster.prototype.invoke = function(spell, target) {
//       if(Spell instanceof(Spell)) {
//           return false;
//       } else if((spell instanceof(DamageSpell) === true) && (target instanceof(Spellcaster) === true)) {
//             if(this.spendMana(spell.cost) === true) {
//                 this.spendMana(spell.cost);
//                 this.inflictDamage();
//                 return true;
//             } else {
//                 return false;
//             }
//       } else {
//           return false;
//       }
//   }