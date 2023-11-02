import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import Header from "./components/header"
import '@testing-library/jest-dom'
import Badge from "./components/badge"
import ResultCard from "./components/result-card"
import SearchInput from "./components/search-process/search-input"
import userEvent from '@testing-library/user-event'
import SearchButton from "./components/search-process/search-button"
import SearchProcess from "./components/search-process"
import Processo from "./processo/[slug]/page"

const mockProcess = {
  "id": 6,
  "cnj": "2021111-57.2010.6.22.1234",
  "partes_processo": [
    {
      "nome": "Mick Jagger",
      "posicao": "Assistente"
    }
  ],
  "tribunal_origem": "TJRJ",
  "data_inicio": "10/12/1980",
  "movimentacoes": [
    {
      "data": "10/12/1999",
      "descricao": "PROCESSO n 2021111-57.2010.6.22.1234 de RJ"
    }
  ]
}

jest.mock('next/navigation', () => ({
  useRouter() {
    return 
  },
  useParams() {
    return "2021111-57.2010.6.22.1234"
  },
}));

describe("Testes do componente header", () => {
  it("Testa se tem uma imagem", () => {
    render(<Header />)
    const element = screen.getByRole("img")
    expect(element).toBeInTheDocument()
  })
})

describe("Testa o componente <SearchProcess />", () => {
  test('Renderiza o componente SearchProcess corretamente', () => {
    render(<SearchProcess />);
    
    expect(screen.getByText('Consulta Processual')).toBeInTheDocument();
    expect(screen.getByText('Faca uma busca pelo número do processo ou pela sigla do tribunal')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite um número de processo ou sigla do tribunal')).toBeInTheDocument();
    expect(screen.getByText('CONSULTAR')).toBeInTheDocument();
  });

  test('Mostra o erro quando o campo de busca estiver vazio', () => {
    render(<SearchProcess />);
  
    const buttonElement = screen.getByText('CONSULTAR');
    fireEvent.click(buttonElement);
  
    expect(screen.getByText(/você precisa preencher o campo/i)).toBeInTheDocument();

  });
  
  test('Mostra "Não encontramos nenhum resultado" quando não encontra nenhuma busca', async() => {
    render(<SearchProcess />);

    const inputElement = screen.getByPlaceholderText(/Digite um número de processo ou sigla do tribunal/i);
    fireEvent.change(inputElement, { target: { value: 'Ronaldinho Gaúcho' } });

    await userEvent.click(screen.getByText('CONSULTAR'));

    await waitFor(() => {
      expect(screen.getByText(/não encontramos nenhum resultado/i)).toBeInTheDocument();
    });
  });
})

describe("Testa o componente <SearchInput />", () => {
  test('Renderiza o componente SearchInput corretamente', () => {
    render(<SearchInput placeholder="Digite um número de processo" />);
  
    const inputElement = screen.getByPlaceholderText('Digite um número de processo');
    expect(inputElement).toBeInTheDocument();
  });
  
  test('Aceita entrada de texto', async () => {
    render(<SearchInput placeholder="Digite um número de processo" />);
  
    const inputElement = screen.getByPlaceholderText('Digite um número de processo');
    await userEvent.type(inputElement, 'TJRJ');
    expect(inputElement).toHaveValue('TJRJ');
  });
})

describe("Testa o componente <SeachButton />", () => {
  test('Renderiza o componente SearchButton corretamente', () => {
    render(<SearchButton>Buscar</SearchButton>);
  
    const buttonElement = screen.getByText('Buscar');
    expect(buttonElement).toBeInTheDocument();
  });
  
  test('Executa a função de clique quando o botão é pressionado', async() => {
    const onClick = jest.fn(); 
    render(<SearchButton onClick={onClick}>Buscar</SearchButton>);
  
    const buttonElement = screen.getByText('Buscar');
  
    await userEvent.click(buttonElement);
  
    expect(onClick).toHaveBeenCalled();
  });
})

describe("Testa o componente <ResultCard", () => {
  it("Card de processo", () => {
    render(<ResultCard element={mockProcess} />)

    const processoText = screen.getByText('Processo:');
  const cnjText = screen.getByText('2021111-57.2010.6.22.1234');
  expect(processoText).toBeInTheDocument();
  expect(cnjText).toBeInTheDocument();

  const tribunalBadge = screen.getByText('TJRJ');
  expect(tribunalBadge).toBeInTheDocument();

  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('href', '/processo/2021111-57.2010.6.22.1234');
  })
})


describe("Testes do componente <Processo />", () => {
  test('Renderiza o componente Processo corretamente', async () => {  
    render(<Processo />);
    expect(screen.getByText('PROCESSO CNJ:')).toBeInTheDocument();
    expect(screen.getByText('Distribuido em:')).toBeInTheDocument();
    expect(screen.getByText('Realizar nova busca')).toBeInTheDocument();
    expect(screen.getByText('Voltar')).toBeInTheDocument();
  });
})