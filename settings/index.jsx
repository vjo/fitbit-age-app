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
    </Page>
  );
}

registerSettingsPage(mySettings);