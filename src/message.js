const message = `
Você deve retornar o que pedi na ordem que pedi e APENAS OS NUMEROS. Caso não encontre o que pedi retorne "NOT". Retorne os resultados em formato de 
        Objeto Javascript, onde as propriedades do objeto devem ser exatamente: 
        {
            nota: "numero encontrado",
            emissao: "data encontrada",
            valorServico: "valor encontrado",
            valorImpostos: "valor encontrado,
            discriminacao: "discriminações encontradas"
        }.
    
        Seja sucinta e objetiva, e localize apenas as informações Número da nota, data de emissão, valor dos serviços, valor dos impostos e discriminação dos serviços 
        no texto a seguir: `

export default message