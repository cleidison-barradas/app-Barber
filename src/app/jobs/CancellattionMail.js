import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class CancellationMail {
    get key() {
        return 'CancellationMail';
    }

    async handle({ data }) {
        const { appointments } = data;

        await Mail.senMail({
            to: `${appointments.provider.name} <${appointments.provider.email}>`,
            subject: 'Agendamento cancelado',
            template: 'cancelation',
            context: {
                provider: appointments.provider.name,
                user: appointments.user.name,
                date: format(
                    parseISO(appointments.date),
                    "'dia' dd 'de' MMMM',' 'as' `H:mm'h'",
                    { locale: pt }
                ),
            },
        });
    }
}

export default new CancellationMail();
