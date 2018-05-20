function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Birthday Clock Settings</Text>}
      >
        <TextInput
          label="Birthday date"
          title="Birthday date"
          placeholder="YYYY-MM-DD"
          settingsKey="birthday"
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);