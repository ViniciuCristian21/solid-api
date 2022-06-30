import { IMailProvider } from './../../providers/IMailProvider';
import { User } from './../../entities/User';
import { ICrateUserRequestDTO } from './CreateUserDTO';
import { IUserRepository } from './../../repositories/IUserRepository';


export class CreateUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private mailProvider: IMailProvider,
    ) {}
    async execute(data: ICrateUserRequestDTO) {
        const userAllReadExists = await this.userRepository.findByEmail(data.email);

        if (userAllReadExists) {
            throw new Error("User allready exists.");
        }


        const user = new User(data);

        await this.userRepository.save(user)

        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email
            },
            from: {
                name: "Equipe do meu app",
                email: "app@meuapp.com"
            },
            subject: "Seja bemvindo ao meu app",
            body: "<p>Você já pode fazer login em nossa plataforma.</p>"
        })
    }
}