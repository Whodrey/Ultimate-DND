import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "dark",
    themes: {
      dark: {
        dark: false,
        colors: {
          primary: "#533747",
          secondary: "#5F506B",
          tertiary: "#5F506B",
          background: "#E0E2DB",
          error: "#E71D36",
          info: "#A7C4C2",
          success: "#7DAA92",
          warning: "#E9B872",
        },
      },
    },
  },
});
