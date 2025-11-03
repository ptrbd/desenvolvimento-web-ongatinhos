document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('cadastroForm');
    if (!form) {
        return;
    }

    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const cpf = document.getElementById('cpf');
    const telefone = document.getElementById('telefone');
    const nascimento = document.getElementById('nascimento');
    const cep = document.getElementById('cep');
    const endereco = document.getElementById('endereco');
    const cidade = document.getElementById('cidade');
    const estado = document.getElementById('estado');

    form.addEventListener('submit', function (evento) {
        evento.preventDefault();

        if (checkAllInputs()) {
            alert('Cadastro enviado com sucesso!');
            form.reset();

            document.querySelectorAll('.form-group.success').forEach((group) => {
                group.classList.remove('success');
            });
        }
    });

    function checkAllInputs() {

        const nomeValue = nome.value.trim();
        const emailValue = email.value.trim();
        const cpfValue = cpf.value.trim();
        const telefoneValue = telefone.value.trim();
        const nascimentoValue = nascimento.value.trim();
        const cepValue = cep.value.trim();
        const enderecoValue = endereco.value.trim();
        const cidadeValue = cidade.value.trim();
        const estadoValue = estado.value.trim();

        let allValid = true;

        // Validação do nome
        if (nomeValue === '') {
            setError(nome, 'Nome completo é obrigatório');
            allValid = false;
        } else if (nomeValue.split(' ').length < 2) {
            setError(nome, 'Por favor, insira seu nome completo');
            allValid = false;
        } else {
            setSuccess(nome);
        }

        // Validação do email
        if (emailValue === '') {
            setError(email, 'Email é obrigatório');
            allValid = false;
        } else if (!isValidEmail(emailValue)) {
            setError(email, 'Insira um formato de email válido');
            allValid = false;
        } else {
            setSuccess(email);
        }

        // Validação do cpf
        const cpfRegex = /\d{3}\.?\d{3}\.?\d{3}-?\d{2}/;
        if (cpfValue === '') {
            setError(cpf, 'CPF é obrigatório');
            allValid = false;
        } else if (!cpfRegex.test(cpfValue)) {
            setError(cpf, 'Formato de CPF inválido (use 000.000.000-00)');
            allValid = false;
        } else {
            setSuccess(cpf);
        }

        // Validação do telefone
        const telRegex = /\(\d{2}\) \d{4,5}-\d{4}/;
        if (telefoneValue === '') {
            setError(telefone, 'Telefone é obrigatório');
            allValid = false;
        } else if (!telRegex.test(telefoneValue)) {
            setError(telefone, 'Formato inválido (use (00) 00000-0000)');
            allValid = false;
        } else {
            setSuccess(telefone);
        }

        // Validação da data de nascimento
        if (nascimentoValue === '') {
            setError(nascimento, 'Data de nascimento é obrigatória');
            allValid = false;
        } else {
            setSuccess(nascimento);
        }

        // Validação cep
        const cepRegex = /\d{5}-?\d{3}/;
        if (cepValue === '') {
            setError(cep, 'CEP é obrigatório');
            allValid = false;
        } else if (!cepRegex.test(cepValue)) {
            setError(cep, 'Formato de CEP inválido (use 00000-000)');
            allValid = false;
        } else {
            setSuccess(cep);
        }

        // Valida se os campos endereço, cidade e estado não estão vazios para prosseguir
        if (enderecoValue === '') { setError(endereco, 'Endereço é obrigatório'); allValid = false; } else { setSuccess(endereco); }
        if (cidadeValue === '') { setError(cidade, 'Cidade é obrigatória'); allValid = false; } else { setSuccess(cidade); }
        if (estadoValue === '') { setError(estado, 'Estado é obrigatório'); allValid = false; } else { setSuccess(estado); }

        return allValid;
    }

    function setError(input, message) {
        const formGroup = input.parentElement;
        const small = formGroup.querySelector('.error-message');

        small.innerText = message;
        formGroup.classList.add('error');
        formGroup.classList.remove('success');
    }

    function setSuccess(input) {
        const formGroup = input.parentElement;
        const small = formGroup.querySelector('.error-message');

        small.innerText = '';
        formGroup.classList.add('success');
        formGroup.classList.remove('error');
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

});