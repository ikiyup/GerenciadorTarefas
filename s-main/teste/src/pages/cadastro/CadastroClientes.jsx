import { Flex, Box, Center, FormControl, Input, FormLabel, HStack, RadioGroup, Radio, Button, Stack }
  from "@chakra-ui/react";
import { useState } from 'react';

import api from "../../api";

function CadastroClientes() {

  const [nome, setNome] = useState('')
  const [username, setUsername] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [cpf, setCpf] = useState("")
  const [cep, setCep] = useState("")
  const [endereco, setEndereco] = useState("")
  const [cidade, setCidade] = useState("")
  const [bloco, setBloco] = useState("")
  const [sexo, setSexo] = useState("MASCULINO")


  const submit = (e) => {
    e.preventDefault()

    const data = {
      nome,
      username,
      whatsapp,
      cpf,
      cep,
      endereco,
      cidade,
      bloco,
      sexo
    }

    console.log(data)

    api.post('/clients', data).then(() => {
      window.location.href = '/app/listagem/clientes'
    })
  }


  return (
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
          <form  onSubmit={submit}>
            <FormControl display="flex" flexDir="column" gap="4">
              <Stack direction="row">
                <Button size='md' colorScheme='blue' href="/home">Voltar</Button>
              </Stack>

              <HStack spacing="4">
                <Box w="100%">
                  <FormLabel htmlFor="nome">Nome Completo</FormLabel>
                  <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                </Box>
                <Box w="100%">
                  <FormLabel htmlFor="username"> Username</FormLabel>
                  <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </Box>
              </HStack>

              <HStack spacing="4">
                <Box w="100%">
                  <FormLabel htmlFor="cel">Telefone Celular</FormLabel>
                  <Input id="cel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)}/>
                </Box>
                <Box w="100%">
                  <FormLabel htmlFor="cpf">CPF</FormLabel>
                  <Input id="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)}/>
                </Box>
              </HStack>

              <HStack spacing="4">
                <Box w="30%">
                  <FormLabel htmlFor="cep">CEP</FormLabel>
                  <Input id="cep" value={cep} onChange={(e) => setCep(e.target.value)}/>
                </Box>
                <Box w="100%">
                  <FormLabel htmlFor="endereco">Endereço</FormLabel>
                  <Input id="endereco" value={endereco} onChange={(e) => setEndereco(e.target.value)}/>
                </Box>
                <Box w="40%">
                  <FormLabel htmlFor="cidade">Cidade</FormLabel>
                  <Input id="cidade" value={cidade} onChange={(e) => setCidade(e.target.value)}/>
                </Box>
                <Box w="20%">
                  <FormLabel htmlFor="bloco"> Bloco </FormLabel>
                  <Input id="bloco" value={bloco} onChange={(e) => setBloco(e.target.value)}/>
                </Box>
              </HStack>

              <HStack spacing="4">
                <Box w="100%">
                  <FormLabel>Sexo</FormLabel>
                  <RadioGroup defaultValue="MASCULINO" onChange={setSexo}>
                    <HStack spacing="24px">
                      <Radio value="MASCULINO">Masculino</Radio>
                      <Radio value="FEMININO">Feminino</Radio>
                    </HStack>
                  </RadioGroup >
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
  );
}

export default CadastroClientes;




