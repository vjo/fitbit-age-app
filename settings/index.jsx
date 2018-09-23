function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Age App Settings</Text>}
      >
        <TextInput
          title="Birthday date"
          label="Birthday date"
          placeholder="YYYY-MM-DD"
          settingsKey="birthday"
        />
      </Section>
      <Section>
        <ColorSelect
          settingsKey="theme"
          colors={[
            {color: "#F80070"},
            {color: "#DA70D6"},
            {color: "#FA8072"},
            {color: "#FFCC33"},
            {color: "#98FB98"},
            {color: "#2E8B57"},
            {color: "#00BFFF"}
          ]}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);