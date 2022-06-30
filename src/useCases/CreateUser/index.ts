import { CrateUserController } from './CreateUserController';
import { CreateUserUseCase } from './CreateUserUseCase';
import { MailTrapMailProvider } from './../../providers/implementations/MailTrapMailProvider';
import { PostgresUserRepository } from "../../repositories/implementations/PostgresUserRepository";



const postgreUserRepository = new PostgresUserRepository()
const mailTrapMAilProvider = new MailTrapMailProvider()


const createUserUseCase = new CreateUserUseCase(
    postgreUserRepository,
    mailTrapMAilProvider
)

const createUserController = new CrateUserController(
    createUserUseCase
)

export { createUserUseCase, createUserController}