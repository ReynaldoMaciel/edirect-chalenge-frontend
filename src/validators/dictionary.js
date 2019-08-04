const dictionary = {
  pt_BR: {
    messages: {
      _default: (e) => `O valor do campo não é válido.`,
      after: (e, n) => `O valor do campo deve ser posterior a ${n[0]}.`,
      alpha_dash: (e) => `O campo deve conter letras, números e traços.`,
      alpha_num: (e) => `O campo deve conter somente letras e números.`,
      alpha_spaces: (e) => `O campo só pode conter caracteres alfabéticos e espaços.`,
      alpha: (e) => `O campo deve conter somente letras.`,
      before: (e, n) => `O valor do campo deve ser anterior a ${n[0]}.`,
      between: (e, n) => `O campo deve estar entre ${n[0]} e ${n[1]}.`,
      confirmed: (e, n) => `Este campo deve ser igual ao campo ${n[0]}.`,
      credit_card: (e) => `O campo é inválido.`,
      date_between: (e, n) => `O campo deve ser maior que ${n[0]} e menor que ${n[1]}.`,
      date_format: (e, n) => `O campo deve estar no formato dd/mm/aaaa.`,
      digits: (e, n) => `O campo deve ser numérico e ter exatamente ${n[0]} dígitos.`,
      dimensions: (e, n) => `A imagem deve ter ${n[0]} pixels de largura por ${n[1]} pixels de altura.`,
      email: (e) => `O campo deve ser um email válido.`,
      ext: (e, n) => `O arquivo deve possuir a extensão ${n}.`,
      image: (e) => `O campo deve ser uma imagem.`,
      in: (e) => `O campo deve ter um valor válido.`,
      integer: (e) => `O campo deve ser um número inteiro.`,
      ip: (e) => `O campo deve ser um endereço IP válido.`,
      length: (e, n) => {
        var o = n[0]
        var r = n[1]
        return r ? `O tamanho do campo está entre ${o} e ${r}.` : `O tamanho do campo ${e} deve ser ${o}.`
      },
      max: (e, n) => `O campo não deve ter mais que ${n[0]} caracteres.`,
      max_value: (e, n) => `O campo precisa ser ${n[0]} ou menor.`,
      mimes: (e) => `O campo deve ser um tipo de arquivo válido.`,
      min: (e, n) => `O campo deve conter pelo menos ${n[0]} caracteres.`,
      min_value: (e, n) => `O campo precisa ser ${n[0]} ou maior.`,
      not_in: (e) => `O campo deve ser um valor válido.`,
      numeric: (e) => `O campo deve conter apenas números`,
      regex: (e) => `O campo possui um formato inválido.`,
      required: (field) => `O campo é obrigatório.`,
      size: (e, n) => `O tamanho do arquivo deve ser menor que ${n >= 1024 ? n / 1024 + 'Mb' : n + 'Kb'}`,
      url: (e) => `O campo ${e} não é uma URL válida.`,
      cpf: () => 'CPF inválido'
    }
  }
}

export default dictionary
