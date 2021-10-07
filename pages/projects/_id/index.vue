<template>
  <div class="h-5/6">
    <div class="flex justify-between">
      <EditableText
        class="pt-4 px-10 text-xl font-bold text-gray-600"
        :text="project.name"
        :on-submit="renameProject"
        :swal-option="swalOption(project.name)"
      />
      <MemberButton :members="project.members" />
    </div>
    <EditorTab
      :programs="programs"
      :selected-id="selectedId"
      :on-click-tab="onClickTab"
      :on-submit-new-tab="onSubmitNewTab"
    />
    <Editor ref="editor" :source="source" :update-source="updateSource" />
  </div>
</template>

<script lang="ts">
import { $axios } from '@/utils/api'
import Vue from 'vue'

const getSource = async (projectId: string, programId: string) => {
  const program = await $axios.$get(
    `/api/projects/${projectId}/programs/${programId}`
  )
  if (!program.source)
    return '<xml xmlns="https://developers.google.com/blockly/xml"></xml>'
  return program.source
}

export default Vue.extend({
  layout: 'fullwidth',

  async asyncData({ params }) {
    const res = await $axios.get(`/api/projects/${params.id}`)
    const project = {
      id: res.data.id,
      name: res.data.name,
      updatedAt: new Date(res.data.updatedAt),
      members: res.data.members,
    }
    const programs = res.data.programs.map(
      (program: { id: string; name: string; updatedAt: Date }) => {
        program.updatedAt = new Date(program.updatedAt)
        return program
      }
    )

    const tags = res.data.tags
    const selectedId = programs.length > 0 ? programs[0].id : null

    const source =
      selectedId === null ? '' : await getSource(params.id, selectedId)

    return {
      project,
      programs,
      tags,
      selectedId,
      source,
    }
  },
  data() {
    return {
      project: {
        id: '',
        name: '',
        updatedAt: new Date(),
      },
      programs: [
        {
          id: '',
          name: '',
          updatedAt: new Date(),
        },
      ],
      tags: {
        id: '',
        name: '',
      },
      selectedId: '',
      source: '',
      connection: new WebSocket("wss://l0g0x3lf13.execute-api.ap-northeast-1.amazonaws.com/dev"),
      showChild: true,
    }
  },
  head() {
    return {
      title: (this as any).project.name,
    }
  },

  methods: {
    renameProject(name: string) {
      $axios
        .$patch(`/api/projects/${this.$route.params.id}`, {
          project: { name },
        })
        .then((res) => {
          Vue.set(this.project, 'name', res.name)
        })
    },

    async onClickTab(selectedId: string) {
      this.selectedId = selectedId
      this.source = await getSource(this.$route.params.id, selectedId)
    },

    updateSource(source: string, eventJsonString: string) {
      $axios.$patch(
        `/api/projects/${this.$route.params.id}/programs/${this.selectedId}/source`,
        {
          program: { source },
        }
      )
      this.connection.send('{"action": "sendmessage", "data": "' + eventJsonString + '"}');
      console.log('updateSource')
    },

    onSubmitNewTab(programName: string) {
      $axios
        .$post(
          `/api/projects/${this.$route.params.id}/programs`,
          {
            program: { name: programName },
          }
        )
        .then((res) => {
          this.programs.push({
            id: res.id,
            name: res.name,
            updatedAt: res.updatedAt,
          })
        })
    },

    swalOption(name: string) {
      return {
        title: 'プロジェクト名を変更',
        input: 'text',
        inputValue: name,
        text: name,
        confirmButtonText: '変更',
      }
    },
    getProgram(source: string) {
      this.$refs.editor.updateGateway(source)
    },
  },

  created: function() {
    this.connection.onopen = (event: any) => {
      console.log("Successfully connected to the echo WebSocket Server")
    }
    this.connection.onmessage = (event: any) => {
      if(event.data.match(/<block.*?<\/block>/)){
        const xml = event.data.match(/<block.*?<\/block>/)[0].replace(/\"/g,'\\\"')
        this.getProgram(event.data.replace(/<block.*?<\/block>/,xml))
      }else{
        this.getProgram(event.data)
      }
    }
  },
})
</script>
