import type { Database } from 'sqlite3'

export interface AccountRepositoryConfig {
  tableName: string
  database: Database
}

class AccountRepository {
  tableName: string
  database: Database

  /**
     * Creates the SignUpRepository
     * @param config the SignUpRepositoryConfig- the Client is injected into the repository as a dependency, and the table name is given.
     */
  constructor (config: AccountRepositoryConfig) {
    this.tableName = config.tableName
    this.database = config.database
  }

  /**
     * emailExists checks to see if a account exists inside of the database
     * @param email the email to check for
     * @returns a boolean promise. TRUE if there is an email found, FALSE if there isn't.
     */
  async emailExists (email: string): Promise<boolean> {
    const query = `SELECT id FROM ${this.tableName} WHERE email=$value`
    const rowCount = await new Promise<any[]>((resolve, reject) => {
      this.database.all(query, {
        $value: email
      }, (error, result) => {
        if (error !== null) {
          reject(error)
        } else {
          resolve(result)
        }
      })
    })
    if (rowCount.length > 0) {
      return true
    } else {
      return false
    }
  }

  /**
     * retrieveHashAndSalt attempts to find the given hash and salt for a certain email
     * @param email the email to check for
     * @returns a object, OR null if there is nothing for the given email (email doesn't exist). {hash: string, salt: string}
     */
  async retrieveHashAndSalt (email: string): Promise<{ id: number, hash: string, salt: string } | null> {
    const query = `SELECT id, passwordHash, passwordSalt FROM ${this.tableName} WHERE email=$value`
    const row = await new Promise<any[]>((resolve, reject) => {
      this.database.all(query, {
        $value: email
      }, (error, result) => {
        if (error !== null) {
          reject(error)
        } else {
          resolve(result)
        }
      })
    })
    if (row.length === 0) {
      return null
    } else {
      const id = row[0].id
      const hash = row[0].passwordHash
      const salt = row[0].passwordSalt
      return { id, hash, salt }
    }
  }

  /**
     * insertAccount puts a account into the database.
     * @param email The email to insert
     * @param firstName The first name to insert
     * @param lastName the last name to insert
     * @param passwordHash the hash of the password to insert
     * @param passwordSalt the salt for the password to insert
     */
  async insertAccount (email: string, firstName: string, lastName: string, passwordHash: string, passwordSalt: string): Promise<void> {
    const query = `INSERT INTO ${this.tableName}(email, firstName, lastName, passwordHash, passwordSalt) VALUES($email, $firstName, $lastName, $passwordHash, $passwordSalt)`
    await new Promise<void>((resolve, reject) => {
      this.database.run(query, {
        $email: email,
        $firstName: firstName,
        $lastName: lastName,
        $passwordHash: passwordHash,
        $passwordSalt: passwordSalt
      }, (err) => {
        if (err !== null) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }
}

export default AccountRepository
