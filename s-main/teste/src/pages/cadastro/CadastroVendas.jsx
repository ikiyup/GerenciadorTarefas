import { useEffect, useState } from "react";

import { TableContainer, Table, Thead, Tr, Th, Td, Tbody, Flex, Box, Center, FormControl, Input, FormLabel, HStack, RadioGroup, Radio, Button, Stack, Textarea, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Select }
  from "@chakra-ui/react";

  // get id from url using react router dom
import { useParams } from "react-router-dom";

import api from "../../api";

function CadastroVendas() {
  const { id } = useParams();
  const pesquisa = useDisclosure()
  const [client, setClient] = useState({
    id: '',
    nome: '',
    username: '',
    cpf: '',
    whatsapp: ''
  })
  const [busca, setBusca] = useState('')
  const [result, setResult] = useState([])
  const [categories, setCategories] = useState([])

  const [codVenda, setCodVenda] = useState('')
  const [date, setDate] = useState('')
  const [category, setCategory] = useState({
    id: '',
    nome: ''
  })
  const [valor, setValor] = useState()
  const [comentario, setComentario] = useState('')

  const getOder = async () => {
    api.get(`orders/${id}`).then((response) => {
      const data = response.data[0]
      console.log(data)
      setClient(data.client)
      setCodVenda(data.codVenda)
      setDate(data.date)
      setCategory(data.categoria)
      setValor(data.valor)
      setComentario(data.comentario)
    })
  }

  useEffect(() => {
    api.get('categories').then((response) => {
      setCategories(response.data)
    })

    if (id) {
      getOder()
    }
  }, [])

  const buscar = (e) => {
    e.preventDefault()

    api.get('clients', {
      params: {
        nome: busca
      }
    }).then((response) => {
      setResult(response.data)
    })
  }

  const cadastrar = (e) => {
    e.preventDefault()

    const data = {
      codVenda,
      date: new Date(date),
      category: Number(category),
      valor,
      comentario,
      client: client.id
    }
    console.log(data)

    

    api.post('orders', data).then(() => {
      window.location.href = '/app/listagem/vendas'
    })
  }

   
  return (
    <>
      <Modal isOpen={pesquisa.isOpen} onClose={pesquisa.onClose}
        size="full"
        scrollBehavior="inside"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Busca de Cliente</ModalHeader>
          <ModalBody
            display="flex"
            flexDir="column"
          >
            <form onSubmit={buscar}>
              <Box
                w="100%"
                display="flex"
                flexDir="row"
                justifyContent="space-between"
                gap={4}
              >
                <Input type="text" placeholder="Digite o nome do cliente" onChange={(e) => {
                  setBusca(e.target.value)
                  buscar(e)
                }} />
                <Button
                  colorScheme="blue"
                >Buscar</Button>
              </Box>
            </form>
            <TableContainer
              mt={4}
              h="250px"
              overflowY="scroll"
              overflowX="hidden"
            >
              <Table variant='simple'>
                <Thead bgColor="#D9D9D9">
                  <Tr>
                    <Th textAlign="center">Nome</Th>
                    <Th textAlign="center">Usuário</Th>
                    <Th textAlign="center">CPF</Th>
                    <Th textAlign="center">WhatsApp</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {result && result.map((client) => (
                    <Tr
                      key={client.id}
                      cursor="pointer"
                      _hover={{ bgColor: "gray.100" }}
                      onClick={() => {
                        setClient(client)
                        pesquisa.onClose()
                      }}
                    >
                      <Td textAlign="center">{client.nome}</Td>
                      <Td textAlign="center">{client.username}</Td>
                      <Td textAlign="center">{client.cpf}</Td>
                      <Td textAlign="center">{client.whatsapp}</Td>
                    </Tr>
                  ))}
                </Tbody>

              </Table>
            </TableContainer>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={pesquisa.onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box h="100vh" display="flex" flexDir="column">
        <Center
          as="header"
          h={350}
          bg="gray.400"
          color="black"
          fontWeight="bold"
          fontSize="4xl"
          pb="8"
        />
        <Flex
          align="center"
          justify="center"
          bg="blackAlpha.200"
          h="calc(100vh - 150px)"
        >
          <Center
            w="100%"
            maxW={840}
            bg="white"
            top={100}
            position="absolute"
            borderRadius={5}
            p="6"
            boxShadow="0 1px 2px #ccc"
          >
            <form onSubmit={cadastrar}>
              <FormControl display="flex" flexDir="column" gap="4">
                <Stack direction="row">
                  <Button size='md' colorScheme='blue' onClick={() => {
                    window.location.href = '/app/cadastro/clientes'
                  }}>Voltar</Button>
                </Stack>

                <HStack spacing="4">
                  <Box
                    w="100%"
                    display="flex"
                    flexDir="column"
                  >
                    <FormLabel htmlFor="nome">Selecione o Cliente</FormLabel>
                    <Box
                      w="100%"
                      display="flex"
                      flexDir="row"
                      justifyContent="space-between"
                      gap={4}
                    >
                      <Input type="text" placeholder="Nenhum cliente selecionado" value={client.nome} readOnly/>
                      <Button
                        colorScheme="green"
                        onClick={pesquisa.onOpen}
                      >Selecionar</Button>
                    </Box>
                  </Box>
                  <Box w="100%">
                    <FormLabel htmlFor="codigo">Número da venda</FormLabel>
                    <Input id="codigo" type="codigo" onChange={(e) => setCodVenda(e.target.value)} />
                  </Box>
                </HStack>

                <HStack spacing="4">
                  <Box w="100%">
                    <FormLabel htmlFor="nasc">Data de Compra</FormLabel>
                    <Input type="date" onChange={(e) => setDate(e.target.value)} />
                  </Box>
                  <Box w="100%">
                    <FormLabel>Categoria</FormLabel>
                    <Select placeholder="Selecione uma categoria" onChange={(e) => setCategory(e.target.value)} defaultValue={category.id}>
                      {categories && categories.map((category) => (
                        <option key={category.id} value={category.id} onClick={() => setCategory(category)}>{category.nome}</option>
                      ))}
                    </Select>
                  </Box>
                </HStack>

                <HStack spacing="4">
                  <Box w="30%">
                    <FormLabel htmlFor="cel">Valor Venda</FormLabel>
                    <Input id="cel" type="number" onChange={(e) => setValor(e.target.value)} />
                  </Box>
                </HStack>

                <HStack spacing="4">
                  <Box w="100%">
                    <FormLabel htmlFor="comentario">Informações adicionais</FormLabel>
                    <Textarea placeholder='Escreva um comentário...' onChange={(e) => setComentario(e.target.value)} />
                  </Box>
                </HStack>


                <HStack justify="center">
                  <Button
                    w={240}
                    p="6"
                    type="submit"
                    bg="blue.600"
                    color="white"
                    fontWeight="bold"
                    fontSize="xl"
                    mt="2"
                    _hover={{ bg: "blue.700" }}
                  >
                    Enviar
                  </Button>
                </HStack>
              </FormControl>
            </form>
          </Center>
        </Flex>
      </Box>
    </>
  );
}

export default CadastroVendas;




