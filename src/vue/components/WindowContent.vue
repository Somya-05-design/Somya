<template>
  <div class="font-mono text-xs md:text-sm leading-relaxed">
    <!-- ============================================== -->
    <!-- 1. ABOUT ME VIEW -->
    <!-- ============================================== -->
    <div v-if="type === 'about-me'" class="space-y-6 select-none font-mono">
      <!-- Header / Logo -->
      <div class="text-center pt-2">
        <div class="text-green-400 font-bold text-3xl md:text-4xl tracking-wider mb-2">$_</div>
        <h2 class="text-white text-3xl md:text-4xl font-bold tracking-wide">SomyaOS 20</h2>
        <p class="text-gray-500 text-xs md:text-sm mt-1 tracking-widest">Version 3.141592...</p>
      </div>

      <!-- Memory Command -->
      <div class="space-y-3 pt-2">
        <div class="text-green-400 font-bold text-sm md:text-base flex items-center gap-2">
          <span>$ Memory</span>
        </div>
        <!-- Memory Bar Chart -->
        <div class="w-full h-9 bg-gray-900 rounded-lg overflow-hidden flex items-center text-xs font-bold border border-gray-800/60 p-0.5">
          <div class="h-full bg-[#1b5e30] text-green-300/90 flex items-center justify-center rounded-l text-[11px] md:text-xs" style="width: 52%;">
            Reels
          </div>
          <div class="h-full bg-[#22c55e] text-black flex items-center justify-center text-[11px] md:text-xs font-extrabold" style="width: 26%;">
            Life
          </div>
          <div class="h-full bg-[#253243] text-gray-400 flex items-center justify-center rounded-r text-[11px] md:text-xs" style="width: 22%;">
            Shit
          </div>
        </div>
      </div>

      <!-- System Info Command -->
      <div class="space-y-4 pt-2">
        <div class="text-green-400 font-bold text-sm md:text-base flex items-center gap-2">
          <span>$ system_info --detailed</span>
        </div>

        <div class="space-y-4 text-xs md:text-sm">
          <!-- Know Me -->
          <div class="grid grid-cols-1 md:grid-cols-[110px_1fr] gap-2 md:gap-4 items-start">
            <span class="text-white font-bold whitespace-nowrap pt-0.5">Know Me</span>
            <p class="text-gray-300 leading-relaxed">
              a dedicated backend software engineer who loves architecture design, API development, and building ultra-scalable services. I specialize in designing robust backend pipelines that operate with low latency and high availability.
            </p>
          </div>

          <!-- Experience -->
          <div class="flex justify-between items-center py-1">
            <span class="text-white font-bold whitespace-nowrap">Experience</span>
            <span class="text-gray-300 font-mono text-xs md:text-sm">Never Enough For You</span>
          </div>

          <!-- Creativity -->
          <div class="flex justify-between items-center py-1">
            <span class="text-white font-bold whitespace-nowrap">Creativity</span>
            <span class="text-gray-300 font-mono text-xs md:text-sm">69 ZB</span>
          </div>

          <!-- Skills -->
          <div class="grid grid-cols-1 md:grid-cols-[110px_1fr] gap-2 md:gap-4 items-center pt-1">
            <span class="text-white font-bold whitespace-nowrap">Skills</span>
            <div class="flex flex-wrap gap-2">
              <span v-for="skill in ['Java', 'Spring Boot', 'JS', 'Docker', 'Ps', 'Ai', 'REST API', 'GraphQL']" 
                    :key="skill"
                    class="px-3 py-1 bg-[#132d1c] text-green-400 rounded border border-[#20522e] text-xs font-mono font-semibold hover:border-green-400 transition-colors">
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Button -->
      <div class="pt-4">
        <a 
          href="https://drive.google.com/file/d/1zow2fJpklOvULurOL7pqC6ans9OfGT_A/view?usp=sharing" 
          target="_blank"
          rel="noopener noreferrer"
          class="w-full py-3.5 bg-[#22c55e] text-[#121212] font-extrabold rounded-xl hover:bg-[#1ea950] active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-base md:text-lg shadow-lg"
        >
          <span>See My Resume</span>
          <span class="material-symbols-outlined text-xl">open_in_new</span>
        </a>
      </div>
    </div>

    <!-- ============================================== -->
    <!-- 2. PROJECTS VIEW -->
    <!-- ============================================== -->
    <div v-else-if="type === 'projects'" class="space-y-6">
      <div class="flex items-center gap-3 text-green-400 font-bold border-b border-gray-800 pb-2">
        <span class="material-symbols-outlined text-base">code_blocks</span>
        <span>$ ls projects/ -lh</span>
      </div>

      <div class="space-y-4">
        <!-- Project 1 -->
        <a 
          href="https://doc-station.vercel.app" 
          target="_blank" 
          rel="noopener noreferrer"
          class="block p-4 bg-black/30 border border-gray-800 rounded-lg hover:border-green-500/50 hover:bg-black/50 transition-all hover:translate-x-1 group cursor-pointer select-none"
        >
          <div class="flex justify-between items-start mb-2">
            <h3 class="text-white font-bold group-hover:text-green-400 transition-colors text-sm md:text-base flex items-center gap-1.5">
              <span>Docstation</span>
              <span class="material-symbols-outlined text-xs text-green-400 opacity-60 group-hover:opacity-100 transition-opacity">open_in_new</span>
            </h3>
            <span class="text-xs text-gray-500 font-bold">Personal Project</span>
          </div>
          <p class="text-gray-400 text-xs mb-3">
            Built a SpringBoot full-stack platform connecting customers with local print shops for document uploads, customisation, and payment;
            tested PDF preview accuracy and real-time order-tracking flows to ensure reliability.
          </p>
          <div class="flex flex-wrap gap-2">
            <span class="text-[10px] bg-[#1a2e20]/60 text-green-300 px-2 py-0.5 rounded border border-[#2d4d38]/80">Java</span>
            <span class="text-[10px] bg-[#1a2e20]/60 text-green-300 px-2 py-0.5 rounded border border-[#2d4d38]/80">SpringBoot</span>
            <span class="text-[10px] bg-[#1a2e20]/60 text-green-300 px-2 py-0.5 rounded border border-[#2d4d38]/80">Redis</span>
          </div>
        </a>

        <!-- Project 2 -->
        <a 
          href="https://naviure.in" 
          target="_blank" 
          rel="noopener noreferrer"
          class="block p-4 bg-black/30 border border-gray-800 rounded-lg hover:border-green-500/50 hover:bg-black/50 transition-all hover:translate-x-1 group cursor-pointer select-none"
        >
          <div class="flex justify-between items-start mb-2">
            <h3 class="text-white font-bold group-hover:text-green-400 transition-colors text-sm md:text-base flex items-center gap-1.5">
              <span>Naviure Photography</span>
              <span class="material-symbols-outlined text-xs text-green-400 opacity-60 group-hover:opacity-100 transition-opacity">open_in_new</span>
            </h3>
            <span class="text-xs text-gray-500 font-bold">Client Project</span>
          </div>
          <p class="text-gray-400 text-xs mb-3">
            Developed and tested a full-stack portfolio website for a client, verifying functionality of demo modules and service showcases across
            devices.          
          </p>
          <div class="flex flex-wrap gap-2">
            <span class="text-[10px] bg-[#1a2e20]/60 text-green-300 px-2 py-0.5 rounded border border-[#2d4d38]/80">React</span>
            <span class="text-[10px] bg-[#1a2e20]/60 text-green-300 px-2 py-0.5 rounded border border-[#2d4d38]/80">Node</span>
            <span class="text-[10px] bg-[#1a2e20]/60 text-green-300 px-2 py-0.5 rounded border border-[#2d4d38]/80">PostgreSQL</span>
            <span class="text-[10px] bg-[#1a2e20]/60 text-green-300 px-2 py-0.5 rounded border border-[#2d4d38]/80">Cloudflare</span>
          </div>
        </a>

        <!-- Project 3 -->
        <a 
          href="https://famxdev.vercel.app" 
          target="_blank" 
          rel="noopener noreferrer"
          class="block p-4 bg-black/30 border border-gray-800 rounded-lg hover:border-green-500/50 hover:bg-black/50 transition-all hover:translate-x-1 group cursor-pointer select-none"
        >
          <div class="flex justify-between items-start mb-2">
            <h3 class="text-white font-bold group-hover:text-green-400 transition-colors text-sm md:text-base flex items-center gap-1.5">
              <span>FamX Agency</span>
              <span class="material-symbols-outlined text-xs text-green-400 opacity-60 group-hover:opacity-100 transition-opacity">open_in_new</span>
            </h3>
            <span class="text-xs text-gray-500 font-bold">Client Project</span>
          </div>
          <p class="text-gray-400 text-xs mb-3">
            Builted a Full Stack Project and Client Management platform with dashboard and Specified Data Rules          
          </p>
          <div class="flex flex-wrap gap-2">
            <span class="text-[10px] bg-[#1a2e20]/60 text-green-300 px-2 py-0.5 rounded border border-[#2d4d38]/80">Next</span>
            <span class="text-[10px] bg-[#1a2e20]/60 text-green-300 px-2 py-0.5 rounded border border-[#2d4d38]/80">Node</span>
            <span class="text-[10px] bg-[#1a2e20]/60 text-green-300 px-2 py-0.5 rounded border border-[#2d4d38]/80">PostgreSQL</span>
            <span class="text-[10px] bg-[#1a2e20]/60 text-green-300 px-2 py-0.5 rounded border border-[#2d4d38]/80">CI/CD</span>
          </div>
        </a>

      <!-- Project 4-->
        <a 
          href="https://www.figma.com/design/jhXcGcLm7DIemYl2EcpTjZ/Untitled?node-id=0-1&t=2NhlJZhFLd5eGMza-1" 
          target="_blank" 
          rel="noopener noreferrer"
          class="block p-4 bg-black/30 border border-gray-800 rounded-lg hover:border-green-500/50 hover:bg-black/50 transition-all hover:translate-x-1 group cursor-pointer select-none"
        >
          <div class="flex justify-between items-start mb-2">
            <h3 class="text-white font-bold group-hover:text-green-400 transition-colors text-sm md:text-base flex items-center gap-1.5">
              <span>TaskMe</span>
              <span class="material-symbols-outlined text-xs text-green-400 opacity-60 group-hover:opacity-100 transition-opacity">open_in_new</span>
            </h3>
            <span class="text-xs text-gray-500 font-bold">Personal Project</span>
          </div>
          <p class="text-gray-400 text-xs mb-3">
            A personal Productivity tracker , to keep the record of every activity and task done in a day, with a simple and easy to use UI
          </p>
          <div class="flex flex-wrap gap-2">
            <span class="text-[10px] bg-[#1a2e20]/60 text-green-300 px-2 py-0.5 rounded border border-[#2d4d38]/80">React Native</span>
            <span class="text-[10px] bg-[#1a2e20]/60 text-green-300 px-2 py-0.5 rounded border border-[#2d4d38]/80">Android SDK</span>
            <span class="text-[10px] bg-[#1a2e20]/60 text-green-300 px-2 py-0.5 rounded border border-[#2d4d38]/80">Drizzle</span>
          </div>
        </a>
      </div>
    </div>

        <!-- Project 5-->
        <a 
          href="https://github.com/Somya-05-design/Autoverse" 
          target="_blank" 
          rel="noopener noreferrer"
          class="block p-4 bg-black/30 border border-gray-800 rounded-lg hover:border-green-500/50 hover:bg-black/50 transition-all hover:translate-x-1 group cursor-pointer select-none"
        >
          <div class="flex justify-between items-start mb-2">
            <h3 class="text-white font-bold group-hover:text-green-400 transition-colors text-sm md:text-base flex items-center gap-1.5">
              <span>Autoverse</span>
              <span class="material-symbols-outlined text-xs text-green-400 opacity-60 group-hover:opacity-100 transition-opacity">open_in_new</span>
            </h3>
            <span class="text-xs text-gray-500 font-bold">Personal Project</span>
          </div>
          <p class="text-gray-400 text-xs mb-3">
            Designed and prototyped an AI workflow automation platform, testing intuitive user experiences for prompt-driven business process
            automation
          </p>
          <div class="flex flex-wrap gap-2">
            <span class="text-[10px] bg-[#1a2e20]/60 text-green-300 px-2 py-0.5 rounded border border-[#2d4d38]/80">Next</span>
            <span class="text-[10px] bg-[#1a2e20]/60 text-green-300 px-2 py-0.5 rounded border border-[#2d4d38]/80">Node</span>
            <span class="text-[10px] bg-[#1a2e20]/60 text-green-300 px-2 py-0.5 rounded border border-[#2d4d38]/80">Langchain</span>
          </div>
        </a>
      </div>
    </div>

    <!-- ============================================== -->
    <!-- 3. EXPERIENCE VIEW -->
    <!-- ============================================== -->
    <div v-else-if="type === 'experience'" class="space-y-6">
      <div class="flex items-center gap-3 text-green-400 font-bold border-b border-gray-800 pb-2">
        <span class="material-symbols-outlined text-base">history</span>
        <span>$ cat history_log.db</span>
      </div>

      <div class="relative border-l-2 border-gray-800 pl-6 ml-3 space-y-8 py-2">
        <!-- Job 1 -->
        <div class="relative">
          <!-- Timeline dot -->
          <div class="absolute -left-[31px] top-1 bg-green-500 border border-black w-2.5 h-2.5 rounded-full"></div>
          <div class="flex flex-col md:flex-row md:justify-between mb-1.5">
            <span class="text-white font-bold text-sm md:text-base">SDE Intern</span>
            <span class="text-xs text-green-400 font-semibold">FEB'26 - MAY'26</span>
          </div>
          <span class="text-xs text-gray-500 block mb-2">CareerOn Pvt. Ltd.</span>
          <p class="text-gray-400 text-xs leading-relaxed">
          Served as the primary technical point of contact, coordinating sprint delivery and cross-functional development tasks
          across a 4-person team
          </p>
        </div>

        <!-- Job 2 -->
        <div class="relative">
          <div class="absolute -left-[31px] top-1 bg-green-500/60 border border-black w-2.5 h-2.5 rounded-full"></div>
          <div class="flex flex-col md:flex-row md:justify-between mb-1.5">
            <span class="text-white font-bold text-sm md:text-base">Campaign Manager Intern</span>
            <span class="text-xs text-green-400 font-semibold">SEPT'25 - DEC'25</span>
          </div>
          <span class="text-xs text-gray-500 block mb-2">Marico Pvt. Ltd.</span>
          <p class="text-gray-400 text-xs leading-relaxed">
          Conducted A/B testing on AI-generated content formats, improving content turnaround time from 3 days to same-day delivery          </p>
        </div>

        <!-- Job 3 -->
        <div class="relative">
          <div class="absolute -left-[31px] top-1 bg-green-500/30 border border-black w-2.5 h-2.5 rounded-full"></div>
          <div class="flex flex-col md:flex-row md:justify-between mb-1.5">
            <span class="text-white font-bold text-sm md:text-base">Automation + QA Intern</span>
            <span class="text-xs text-green-400 font-semibold">MAY'25 - SEPT'25</span>
          </div>
          <span class="text-xs text-gray-500 block mb-2">Walkover Web Solutions</span>
          <p class="text-gray-400 text-xs leading-relaxed">
            Built, Tested and validated 10+
            
            AI agents for intelligent task orchestration, collaborating with the product team to test integration into existing
            SaaS workflows
          </p>
        </div>
      </div>
    </div>

    <!-- ============================================== -->
    <!-- 4. SOCIAL LIFE VIEW -->
    <!-- ============================================== -->
    <div v-else-if="type === 'social-life'" class="space-y-6">
      <div class="flex items-center gap-3 text-green-400 font-bold border-b border-gray-800 pb-2">
        <span class="material-symbols-outlined text-base">connect_without_contact</span>
        <span>$ curl --info connect/list</span>
      </div>

      <p class="text-gray-300">
        You can reach me, track my commits, or inspect my work across the web:
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        <!-- GitHub -->
        <a 
          href="https://github.com/Somya-05-design" 
          target="_blank" 
          rel="noopener noreferrer"
          class="flex items-center gap-3 p-3 bg-black/40 border border-gray-800 rounded-lg hover:border-green-500 hover:text-green-400 transition-all select-none hover:-translate-y-0.5"
        >
          <span class="material-symbols-outlined text-base">terminal</span>
          <div class="flex flex-col">
            <span class="text-white text-xs font-bold font-mono">GitHub</span>
            <span class="text-[10px] text-gray-500">@Somya-05-design</span>
          </div>
        </a>

        <!-- LinkedIn -->
        <a 
          href="https://linkedin.com/in/somya-tanwar" 
          target="_blank" 
          rel="noopener noreferrer"
          class="flex items-center gap-3 p-3 bg-black/40 border border-gray-800 rounded-lg hover:border-green-500 hover:text-green-400 transition-all select-none hover:-translate-y-0.5"
        >
          <span class="material-symbols-outlined text-base">badge</span>
          <div class="flex flex-col">
            <span class="text-white text-xs font-bold font-mono">LinkedIn</span>
            <span class="text-[10px] text-gray-500">Professional Profile</span>
          </div>
        </a>

        <!-- Twitter/X -->
        <a 
          href="https://x.com/0xSomyaa" 
          target="_blank" 
          rel="noopener noreferrer"
          class="flex items-center gap-3 p-3 bg-black/40 border border-gray-800 rounded-lg hover:border-green-500 hover:text-green-400 transition-all select-none hover:-translate-y-0.5"
        >
          <span class="material-symbols-outlined text-base">alternate_email</span>
          <div class="flex flex-col">
            <span class="text-white text-xs font-bold font-mono">Twitter / X</span>
            <span class="text-[10px] text-gray-500">Short-form thoughts</span>
          </div>
        </a>

        <!-- Email -->
        <a 
          href="mailto:isomyatanwar@gmail.com" 
          class="flex items-center gap-3 p-3 bg-black/40 border border-gray-800 rounded-lg hover:border-green-500 hover:text-green-400 transition-all select-none hover:-translate-y-0.5"
        >
          <span class="material-symbols-outlined text-base">mail</span>
          <div class="flex flex-col">
            <span class="text-white text-xs font-bold font-mono">Email Direct</span>
            <span class="text-[10px] text-gray-500">somyatanwar@example.com</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    required: true
  }
});
</script>
