import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { Heading, SectionList, Text, VStack } from "native-base";
import { useState } from "react";

export function History() {
  const [exercicios, setExercicios] = useState([
    {
      title: "25.09.2001",
      data: [
        "Puxada Frontal",
        "Rosca Direta",
        "Rosca Direta",
        "Tríceps Testa",
        "Desenvolvimento com Halteres",
      ],
    },
    {
      title: "25.09.2001",
      data: [
        "Puxada Frontal",
        "Rosca Direta",
        "Rosca Direta",
        "Tríceps Testa",
        "Desenvolvimento com Halteres",
      ],
    },
  ]);

  return (
    <VStack flex={1}>
      <ScreenHeader title={"Histórico de Exercícios"} />

      <SectionList
        sections={exercicios}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <HistoryCard />}
        renderSectionHeader={({ section }) => (
          <Heading color={"gray.200"} fontSize={"md"} mt={10} mb={3}>
            {section.title}
          </Heading>
        )}
        px={8}
        contentContainerStyle={
          exercicios.length === 0 && { flex: 1, justifyContent: "center" }
        }
        ListEmptyComponent={() => (
          <>
            <Text color={"gray.100"} textAlign={"center"}>
              Não há exercicios registrados ainda. {"\n"} Vamos fazer exercícios
              hoje ?
            </Text>
          </>
        )}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  );
}
