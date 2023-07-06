import { Stack } from "expo-router";

export default function HomeLayout(){
    return(
        <Stack
        screenOptions={{
            headerStyle: {
              backgroundColor: "#2e2e2d",
            },
            headerTintColor: '#f2b407',
            headerTitleStyle: {
              fontWeight: "normal",
            },
          }}
        >
        </Stack>
    );
}
