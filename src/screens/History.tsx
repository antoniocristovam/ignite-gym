import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useCallback, useState } from "react";
import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { useFocusEffect } from "@react-navigation/native";
import { Heading, SectionList, Text, useToast, VStack } from "native-base";
import { HistoryByDayDTO } from "@dtos/HistoryGroupByDayDTO";

export function History() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [exercicios, setExercicios] = useState<HistoryByDayDTO[]>([]);

  async function fetchHistory() {
    try {
      const response = await api.get("history");
      setExercicios(response.data);
    } catch (error) {
      setIsLoading(true);
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível registrar o exercício.";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  return (
    <VStack flex={1}>
      <ScreenHeader title={"Histórico de Exercícios"} />

      <SectionList
        sections={exercicios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HistoryCard data={item} />}
        renderSectionHeader={({ section }) => (
          <Heading
            color={"gray.200"}
            fontSize={"md"}
            mt={10}
            mb={3}
            fontFamily={"heading"}
          >
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
