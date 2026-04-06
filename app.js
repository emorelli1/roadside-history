// ── Themes ────────────────────────────────────────────────────────
const THEMES = [
  { id:'wars-military',       label:'Wars & Military',       color:'#8B2635' },
  { id:'colonial-settlement', label:'Colonial & Settlement',  color:'#8B6914' },
  { id:'indigenous',          label:'Indigenous History',     color:'#2D6A4F' },
  { id:'government-law',      label:'Government & Law',       color:'#1A4A8A' },
  { id:'notable-people',      label:'Notable People',         color:'#6B3FA0' },
  { id:'industry-commerce',   label:'Industry & Commerce',    color:'#C45C1A' },
  { id:'social-movements',    label:'Social Movements',       color:'#3D5A80' },
  { id:'architecture-places', label:'Architecture & Places',  color:'#4A7C59' },
];

const PHYSICAL_TYPES = [
  { id:'plaque',      label:'Plaque' },
  { id:'monument',    label:'Monument' },
  { id:'memorial',    label:'Memorial' },
  { id:'statue',      label:'Statue' },
  { id:'museum',      label:'Museum' },
  { id:'cemetery',    label:'Cemetery' },
  { id:'battlefield', label:'Battlefield' },
  { id:'building',    label:'Building' },
  { id:'bridge',      label:'Bridge' },
  { id:'natural',     label:'Natural feature' },
  { id:'other',       label:'Other' },
];

const SORT_MODES = ['nearest','visited','recent'];
let sortMode = 'nearest';

// ── Marker data ───────────────────────────────────────────────────
let markers = [
  { id:'1', title:'Battle of Bull Run', subtitle:'First major land battle of the Civil War', body:'On July 21, 1861, Union and Confederate forces clashed in the first major land battle of the Civil War near Manassas, Virginia. Confederate General Thomas J. Jackson earned the nickname "Stonewall" here. The Union army was routed and fled back toward Washington, demonstrating the war would not end quickly.', lat:38.8151, lng:-77.5219, themes:['wars-military'], physical_type:'battlefield', era_start:1861, era_end:1861, tags:['civil war','battle','stonewall jackson','union','confederate'], people:['Thomas J. Jackson'], condition:'Good', status:'approved', submittedBy:'admin', dateSubmitted:'2024-01-15', sources:['https://www.nps.gov/mana/index.htm'], address:'Manassas, Virginia', visits:142, access_types:['parking','walking'], access_notes:'Large NPS visitor center parking lot on Henry Hill — free, open year round. The battlefield monument is 0.3 miles on foot from the main lot and clearly visible from the trail.' },
  { id:'2', title:'Pohick Church', subtitle:'Colonial parish church of George Washington', body:"Pohick Church, built 1769–1774, was the colonial parish church of George Washington and George Mason. Washington served on the vestry and helped select its location. The church survived the Civil War, though it was used as a stable by Union troops. It remains an active Episcopal congregation today.", lat:38.6868, lng:-77.2382, themes:['colonial-settlement','architecture-places'], physical_type:'building', era_start:1769, era_end:1774, tags:['colonial','church','founding era'], people:['George Washington','George Mason'], condition:'Good', status:'approved', submittedBy:'history_buff_va', dateSubmitted:'2024-02-03', sources:['https://www.pohick.org'], address:'9301 Richmond Hwy, Lorton, VA', visits:87 },
  { id:'3', title:'Occoquan Mill Town', subtitle:'Historic grist mill community, est. 1759', body:'John Ballendine established a grist mill here in 1759, one of the earliest industrial sites in the region. The area was notable during the Civil War and later became home to the Occoquan Workhouse, where suffragists were imprisoned in 1917.', lat:38.6837, lng:-77.2627, themes:['industry-commerce','social-movements'], physical_type:'plaque', era_start:1759, era_end:1917, tags:['mill','industry','suffrage','women'], people:[], condition:'Good', status:'approved', submittedBy:'local_historian', dateSubmitted:'2024-02-18', sources:[], address:'Occoquan, Virginia', visits:63 },
  { id:'4', title:'Dogan House', subtitle:'Witness to two battles at Bull Run', body:'The Dogan House stood at a crossroads near Groveton and witnessed both battles of Bull Run in 1861 and 1862. The farmstead changed hands multiple times. Preserved within Manassas National Battlefield Park.', lat:38.8224, lng:-77.5401, themes:['wars-military','architecture-places'], physical_type:'building', era_start:1861, era_end:1862, tags:['civil war','battle','farmstead','union','confederate'], people:[], condition:'Good', status:'approved', submittedBy:'battlefield_walker', dateSubmitted:'2024-03-01', sources:['https://www.nps.gov/mana/index.htm'], address:'Manassas National Battlefield Park, VA', visits:51 },
  { id:'5', title:"Merrimac Farm", subtitle:"Site of Mosby's Rangers operations", body:"This property lies within Mosby's Confederacy, where Colonel John S. Mosby's 43rd Battalion Virginia Cavalry conducted guerrilla raids against Union supply lines throughout 1863–1865.", lat:38.7589, lng:-77.5812, themes:['wars-military'], physical_type:'plaque', era_start:1863, era_end:1865, tags:['civil war','confederate','guerrilla warfare'], people:['John S. Mosby'], condition:'Fair', status:'approved', submittedBy:'mosby_trail', dateSubmitted:'2024-03-14', sources:[], address:'Nokesville, Virginia', visits:29, access_types:['roadside','seasonal'], access_notes:'Marker sits on the gravel shoulder of Merrimac Farm Rd heading east. No dedicated parking — pull off carefully on the right. Area can be muddy after rain; best visited spring through fall.' },
  { id:'6', title:'Bristoe Station', subtitle:'Site of Confederate defeat, October 1863', body:"On October 14, 1863, A.P. Hill's Confederate corps attacked Union forces under G.K. Warren near Bristoe Station. The poorly executed attack resulted in heavy Confederate casualties.", lat:38.7234, lng:-77.5456, themes:['wars-military'], physical_type:'plaque', era_start:1863, era_end:1863, tags:['civil war','battle','union','confederate'], people:['A.P. Hill','G.K. Warren'], condition:'Good', status:'approved', submittedBy:'cwbuff1863', dateSubmitted:'2024-04-02', sources:[], address:'Bristow, Virginia', visits:44 },
  { id:'7', title:'Unknown Roadside Marker', subtitle:'Community stub — help document this marker', body:'', lat:38.7912, lng:-77.4103, themes:[], physical_type:null, era_start:null, era_end:null, tags:[], people:[], condition:'Unknown', status:'stub', submittedBy:null, dateSubmitted:null, sources:[], address:'Haymarket, Virginia', visits:0 },
  { id:'p1', title:'Unverified: Old Stone Bridge', subtitle:'Submitted by community — pending review', body:'A pre-Civil War stone bridge and key crossing point during the First Battle of Bull Run. Union forces used it during their retreat on July 21, 1861.', lat:38.8190, lng:-77.5280, themes:['wars-military','architecture-places'], physical_type:'bridge', era_start:1861, era_end:1861, tags:['civil war','union','infrastructure'], people:[], condition:'Fair', status:'pending', submittedBy:'bridge_explorer', dateSubmitted:'2024-05-10', sources:[], address:'Near Manassas, Virginia', visits:0 },
  { id:'p2', title:'Unverified: Brentsville Courthouse', subtitle:'Submitted by community — pending review', body:'The Brentsville Courthouse, built in 1822, served as the Prince William County seat until 1893. One of the oldest surviving courthouses in Virginia.', lat:38.7023, lng:-77.4387, themes:['government-law','architecture-places'], physical_type:'building', era_start:1822, era_end:1893, tags:['courthouse','government','law'], people:[], condition:'Good', status:'pending', submittedBy:'courthouse_hunter', dateSubmitted:'2024-05-14', sources:[], address:'Brentsville, Virginia', visits:0 },
];

// ── Filter state ──────────────────────────────────────────────────
let activeThemes      = [];
let activePhysType    = null;
let activeEraFrom     = null;
let activeEraTo       = null;
let activePeopleQuery = '';
let activeTagQuery    = '';
let searchQuery       = '';
let filterPanelOpen   = false;

// ── Google Maps ───────────────────────────────────────────────────
const MAP_STYLES = [
  {elementType:'geometry',stylers:[{color:'#F0EDE6'}]},
  {elementType:'labels.text.fill',stylers:[{color:'#1C1C1A'}]},
  {elementType:'labels.text.stroke',stylers:[{color:'#F7F5F0'}]},
  {featureType:'road',elementType:'geometry',stylers:[{color:'#E2DDD4'}]},
  {featureType:'road',elementType:'geometry.stroke',stylers:[{color:'#D0CABC'}]},
  {featureType:'road.highway',elementType:'geometry',stylers:[{color:'#CCCABC'}]},
  {featureType:'water',elementType:'geometry',stylers:[{color:'#C0D0E0'}]},
  {featureType:'poi.park',elementType:'geometry',stylers:[{color:'#D0E4C8'}]},
  {featureType:'poi',elementType:'labels',stylers:[{visibility:'off'}]},
  {featureType:'transit',stylers:[{visibility:'off'}]},
  {featureType:'administrative',elementType:'geometry.stroke',stylers:[{color:'#D6D0C4'}]},
];
let gmap=null, gmapMarkers=[], openInfoWindow=null;

function markerPinColor(m) {
  if(!m.themes||!m.themes.length) return '#A09A8C';
  const t=THEMES.find(x=>x.id===m.themes[0]);
  return t?t.color:'#A09A8C';
}
function makeSvgPin(color,isStub) {
  const f=isStub?'#D6D0C4':color, s=isStub?'#A09A8C':color;
  return 'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="40" viewBox="0 0 28 40"><path d="M14 0C6.3 0 0 6.3 0 14c0 9.6 14 26 14 26S28 23.6 28 14C28 6.3 21.7 0 14 0z" fill="${f}" stroke="${s}" stroke-width="1.5"/><circle cx="14" cy="14" r="5" fill="white" opacity="${isStub?'0.5':'0.9'}"/></svg>`
  );
}
window.initGoogleMap=function(){
  gmap=new google.maps.Map(document.getElementById('map-canvas'),{
    center:{lat:38.76,lng:-77.45},zoom:11,styles:MAP_STYLES,
    mapTypeControl:false,streetViewControl:false,fullscreenControl:false,
    zoomControl:true,gestureHandling:'greedy',
  });
  placeGoogleMarkers();
  renderLegend();
};
function placeGoogleMarkers(){
  if(!gmap) return;
  gmapMarkers.forEach(m=>m.setMap(null)); gmapMarkers=[];
  if(openInfoWindow){openInfoWindow.close();openInfoWindow=null;}
  const filtered=getFilteredMarkers();
  const filteredIds=new Set(filtered.map(x=>x.id));
  markers.forEach(m=>{
    const inFilter=filteredIds.has(m.id);
    const pin=new google.maps.Marker({
      position:{lat:m.lat,lng:m.lng},map:gmap,title:m.title,
      icon:{url:makeSvgPin(markerPinColor(m),m.status==='stub'),scaledSize:new google.maps.Size(28,40),anchor:new google.maps.Point(14,40)},
      opacity:inFilter?1:0.2, zIndex:m.status==='stub'?0:inFilter?2:1,
    });
    const iw=new google.maps.InfoWindow({content:`<div style="font-family:sans-serif;padding:2px;max-width:180px;"><b style="font-size:13px;color:#1C1C1A">${m.title}</b><br><span style="font-size:11px;color:#8A8A84">${m.subtitle}</span></div>`});
    pin.addListener('click',()=>{if(openInfoWindow)openInfoWindow.close();iw.open(gmap,pin);openInfoWindow=iw;setTimeout(()=>openDetail(m.id),280);});
    gmapMarkers.push(pin);
  });
}
function renderLegend(){
  const el=document.getElementById('map-legend'); if(!el) return;
  const usedIds=[...new Set(markers.flatMap(m=>m.themes||[]))];
  el.innerHTML=usedIds.slice(0,5).map(tid=>{
    const t=THEMES.find(x=>x.id===tid);
    return t?`<div class="legend-item"><div class="legend-dot" style="background:${t.color}"></div>${t.label}</div>`:'';
  }).join('')+`<div class="legend-item"><div class="legend-dot" style="background:#D6D0C4;border:0.5px solid #A09A8C"></div>Undocumented</div>`;
}

// ── Tab switching ─────────────────────────────────────────────────
function switchTab(tab){
  document.querySelectorAll('[id$="-view"]').forEach(v=>v.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
  const view=document.getElementById(tab+'-view'); if(view) view.classList.add('active');
  const btn=document.querySelector(`[data-tab="${tab}"]`); if(btn) btn.classList.add('active');
  if(tab==='explore') renderExplore();
  if(tab==='review')  renderReview();
  if(tab==='submit')  renderSubmitForm();
  if(tab==='map'&&gmap) google.maps.event.trigger(gmap,'resize');
}

// ── Filter engine ─────────────────────────────────────────────────
function getFilteredMarkers(){
  const q=searchQuery.toLowerCase();
  const pq=activePeopleQuery.toLowerCase();
  const tq=activeTagQuery.toLowerCase();
  return markers.filter(m=>{
    if(activeThemes.length && !activeThemes.some(t=>(m.themes||[]).includes(t))) return false;
    if(activePhysType && m.physical_type!==activePhysType) return false;
    if(activeEraFrom!==null && m.era_end!==null && m.era_end<activeEraFrom) return false;
    if(activeEraTo!==null && m.era_start!==null && m.era_start>activeEraTo) return false;
    if(pq && !(m.people||[]).join(' ').toLowerCase().includes(pq) && !(m.tags||[]).join(' ').toLowerCase().includes(pq)) return false;
    if(tq && !(m.tags||[]).join(' ').toLowerCase().includes(tq) && !m.title.toLowerCase().includes(tq)) return false;
    if(q && !m.title.toLowerCase().includes(q) && !m.subtitle.toLowerCase().includes(q) && !(m.tags||[]).join(' ').toLowerCase().includes(q) && !(m.people||[]).join(' ').toLowerCase().includes(q)) return false;
    return true;
  });
}

function getSortedMarkers(filtered){
  if(sortMode==='visited') return [...filtered].sort((a,b)=>(b.visits||0)-(a.visits||0));
  if(sortMode==='recent')  return [...filtered].sort((a,b)=>new Date(b.dateSubmitted||0)-new Date(a.dateSubmitted||0));
  return filtered; // nearest — already in order for demo
}

function cycleSortOrder(){
  const idx=SORT_MODES.indexOf(sortMode);
  sortMode=SORT_MODES[(idx+1)%SORT_MODES.length];
  const labels={nearest:'Nearest',visited:'Most visited',recent:'Recently added'};
  document.getElementById('sort-label').textContent=labels[sortMode];
  renderMarkerList();
}

function countActiveFilters(){
  return activeThemes.length+(activePhysType?1:0)+(activeEraFrom!==null||activeEraTo!==null?1:0)+(activePeopleQuery?1:0)+(activeTagQuery?1:0);
}

function updateFilterBadge(){
  const n=countActiveFilters();
  const badge=document.getElementById('filter-count-badge');
  const clearBtn=document.getElementById('filter-clear-all');
  if(badge){ badge.textContent=n; badge.style.display=n?'inline':'none'; }
  if(clearBtn) clearBtn.style.display=n?'block':'none';
  renderActiveFilterSummary();
}

function renderActiveFilterSummary(){
  const el=document.getElementById('active-filters'); if(!el) return;
  const pills=[];
  activeThemes.forEach(tid=>{
    const t=THEMES.find(x=>x.id===tid);
    if(t) pills.push(`<div class="af-pill"><span style="width:8px;height:8px;border-radius:50%;background:${t.color};flex-shrink:0;display:inline-block"></span>${t.label}<button onclick="removeThemeFilter('${tid}')">×</button></div>`);
  });
  if(activePhysType){
    const pt=PHYSICAL_TYPES.find(x=>x.id===activePhysType);
    if(pt) pills.push(`<div class="af-pill">${pt.label}<button onclick="removePhysFilter()">×</button></div>`);
  }
  if(activeEraFrom!==null||activeEraTo!==null){
    const label=(activeEraFrom||'?')+' – '+(activeEraTo||'?');
    pills.push(`<div class="af-pill">${label}<button onclick="removeEraFilter()">×</button></div>`);
  }
  if(activePeopleQuery) pills.push(`<div class="af-pill">Person: ${activePeopleQuery}<button onclick="removePeopleFilter()">×</button></div>`);
  if(activeTagQuery)    pills.push(`<div class="af-pill">Tag: ${activeTagQuery}<button onclick="removeTagFilter()">×</button></div>`);
  el.innerHTML=pills.join('');
}

function removeThemeFilter(id){ activeThemes=activeThemes.filter(x=>x!==id); applyFilters(); renderFilterChips(); renderTypePills(); }
function removePhysFilter(){ activePhysType=null; applyFilters(); renderTypePills(); }
function removeEraFilter(){ activeEraFrom=null; activeEraTo=null; const f=document.getElementById('era-from'),t=document.getElementById('era-to'); if(f)f.value=''; if(t)t.value=''; applyFilters(); }
function removePeopleFilter(){ activePeopleQuery=''; const el=document.getElementById('people-search'); if(el)el.value=''; applyFilters(); }
function removeTagFilter(){ activeTagQuery=''; const el=document.getElementById('tag-search'); if(el)el.value=''; applyFilters(); }
function clearAllFilters(){ activeThemes=[]; activePhysType=null; activeEraFrom=null; activeEraTo=null; activePeopleQuery=''; activeTagQuery=''; ['era-from','era-to','people-search','tag-search'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';}); applyFilters(); renderFilterChips(); renderTypePills(); }

function applyFilters(){ updateFilterBadge(); renderMarkerList(); if(gmap) placeGoogleMarkers(); }

// Input handlers
function onSearchInput(){ searchQuery=(document.getElementById('search-input')?.value||''); applyFilters(); }
function onEraInput(){ activeEraFrom=parseInt(document.getElementById('era-from')?.value)||null; activeEraTo=parseInt(document.getElementById('era-to')?.value)||null; applyFilters(); }
function onPeopleInput(){ activePeopleQuery=(document.getElementById('people-search')?.value||'').trim(); applyFilters(); }
function onTagInput(){ activeTagQuery=(document.getElementById('tag-search')?.value||'').trim(); applyFilters(); }

function toggleTheme(id){
  if(activeThemes.includes(id)) activeThemes=activeThemes.filter(x=>x!==id);
  else activeThemes.push(id);
  applyFilters(); renderFilterChips();
}
function clearThemes(){ activeThemes=[]; applyFilters(); renderFilterChips(); }

function togglePhysType(id){
  activePhysType=(activePhysType===id)?null:id;
  applyFilters(); renderTypePills();
}

function toggleFilterPanel(){
  filterPanelOpen=!filterPanelOpen;
  const body=document.getElementById('filter-body');
  const btn=document.getElementById('filter-toggle-btn');
  if(body) body.classList.toggle('open',filterPanelOpen);
  if(btn) btn.classList.toggle('open',filterPanelOpen);
}

// ── Explore rendering ─────────────────────────────────────────────
function renderFilterChips(){
  const el=document.getElementById('filter-chips'); if(!el) return;
  el.innerHTML=
    `<button class="chip ${!activeThemes.length?'all-active':''}" onclick="clearThemes()">All</button>`+
    THEMES.map(t=>`<button class="chip ${activeThemes.includes(t.id)?'active':''}" style="${activeThemes.includes(t.id)?`background:${t.color};border-color:${t.color};`:''}" onclick="toggleTheme('${t.id}')">${t.label}</button>`).join('');
}

function renderTypePills(){
  const el=document.getElementById('type-pills'); if(!el) return;
  el.innerHTML=PHYSICAL_TYPES.map(p=>`<button class="type-pill ${activePhysType===p.id?'active':''}" onclick="togglePhysType('${p.id}')">${p.label}</button>`).join('');
}

function renderMarkerList(){
  const list=document.getElementById('marker-list'); if(!list) return;
  const filtered=getSortedMarkers(getFilteredMarkers());
  const countEl=document.getElementById('marker-count');
  if(countEl) countEl.textContent=filtered.length+' marker'+(filtered.length!==1?'s':'');

  if(!filtered.length){
    list.innerHTML=`<div class="empty-state"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg><p>No markers match your filters.<br>Try removing a filter or broadening your search.</p></div>`;
    return;
  }

  list.innerHTML=filtered.map(m=>{
    const primaryTheme=THEMES.find(t=>t.id===(m.themes||[])[0]);
    const physType=PHYSICAL_TYPES.find(p=>p.id===m.physical_type);
    const stub=m.status==='stub';
    const eraStr=m.era_start?(m.era_start===m.era_end?`${m.era_start}`:`${m.era_start}–${m.era_end}`):null;
    const extraThemes=(m.themes||[]).length>1?` <span class="cat-label">+${m.themes.length-1}</span>`:'';

    return `<div class="marker-card ${stub?'stub-card':''} fade-in" onclick="openDetail('${m.id}')">
      <div class="marker-card-inner">
        <div class="card-top">
          <div class="card-themes">
            <div class="cat-dot" style="background:${primaryTheme?primaryTheme.color:'#D6D0C4'}"></div>
            <span class="cat-label">${primaryTheme?primaryTheme.label:'Undocumented'}</span>${extraThemes}
          </div>
          <div class="card-badges">
            ${physType&&!stub?`<span class="phys-badge">${physType.label}</span>`:''}
            <span class="card-status status-${m.status}">${m.status}</span>
          </div>
        </div>
        <div class="card-title">${m.title}</div>
        <div class="card-subtitle">${m.subtitle}</div>
        ${stub
          ? `<div class="stub-cta">+ Help document this marker</div>`
          : `<div class="card-meta">
              <span class="meta-item"><svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>${m.address}</span>
              ${eraStr?`<span class="era-badge">${eraStr}</span>`:''}
              ${m.visits?`<span class="meta-item"><svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>${m.visits}</span>`:''}
            </div>`
        }
      </div>
    </div>`;
  }).join('');
}

function renderExplore(){
  renderFilterChips();
  renderTypePills();
  renderMarkerList();
  updateFilterBadge();
}

// ── Detail view ───────────────────────────────────────────────────
function openDetail(id){
  const m=markers.find(x=>x.id===id); if(!m) return;
  const physType=PHYSICAL_TYPES.find(p=>p.id===m.physical_type);
  const stub=m.status==='stub';
  const dc=document.getElementById('detail-content');

  if(stub){
    dc.innerHTML=`
      <div class="detail-photo-slot"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg></div>
      <div class="detail-body">
        <div class="detail-title" style="color:var(--ink3)">Undocumented Marker</div>
        <div class="detail-subtitle">${m.address}</div>
        <div class="stub-detail-cta">
          <h4>Be the first to document this marker</h4>
          <p>A roadside marker exists near this location but has not been documented yet.</p>
          <button class="btn-primary" onclick="switchTab('submit');closeDetail()">Document This Marker</button>
        </div>
      </div>`;
  } else {
    const eraStr=m.era_start?(m.era_start===m.era_end?`${m.era_start}`:`${m.era_start}–${m.era_end}`):null;
    const themePills=(m.themes||[]).map(tid=>{
      const t=THEMES.find(x=>x.id===tid);
      return t?`<span class="detail-theme-pill" style="color:${t.color};border-color:${t.color};background:${t.color}18">${t.label}</span>`:'';
    }).join('');

    dc.innerHTML=`
      <div class="detail-photo-slot"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg></div>
      <div class="detail-body">
        <div class="detail-theme-row">${themePills}</div>
        <div class="detail-title">${m.title}</div>
        <div class="detail-subtitle">${m.subtitle}</div>
        ${m.body?`<div class="detail-divider"></div><div class="detail-section-label">Marker text</div><div class="detail-text">${m.body}</div>`:''}
        <div class="detail-divider"></div>
        <div class="detail-meta-grid">
          ${m.address?`<div class="meta-block"><div class="meta-block-label">Location</div><div class="meta-block-value">${m.address}</div></div>`:''}
          ${eraStr?`<div class="meta-block"><div class="meta-block-label">Historical era</div><div class="meta-block-value">${eraStr}</div></div>`:''}
          ${physType?`<div class="meta-block"><div class="meta-block-label">Type</div><div class="meta-block-value">${physType.label}</div></div>`:''}
          ${m.condition?`<div class="meta-block"><div class="meta-block-label">Condition</div><div class="meta-block-value" style="color:${m.condition==='Good'?'#2A5C3A':m.condition==='Fair'?'#7A5200':'#7A1A1A'}">${m.condition}</div></div>`:''}
          ${m.visits!=null?`<div class="meta-block"><div class="meta-block-label">Visits</div><div class="meta-block-value">${m.visits}</div></div>`:''}
        </div>
        ${m.people&&m.people.length?`
          <div class="detail-divider"></div>
          <div class="detail-section-label">People</div>
          <div class="tags-wrap">${m.people.map(p=>`<span class="tag-pill person" onclick="filterByPerson('${p}')">${p}</span>`).join('')}</div>`:''}
        ${m.tags&&m.tags.length?`
          <div class="detail-divider"></div>
          <div class="detail-section-label">Tags</div>
          <div class="tags-wrap">${m.tags.map(t=>`<span class="tag-pill" onclick="filterByTag('${t}')">${t}</span>`).join('')}</div>`:''}
        ${(m.access_notes||(m.access_types&&m.access_types.length))?`
          <div class="detail-divider"></div>
          <div class="detail-section-label">Getting there</div>
          ${m.access_types&&m.access_types.length?`<div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px;">${m.access_types.map(t=>`<span style="font-size:10px;padding:3px 9px;border-radius:20px;background:var(--stone);border:0.5px solid var(--border2);color:var(--ink2);">${t}</span>`).join('')}</div>`:''}
          ${m.access_notes?`<div class="detail-text">${m.access_notes}</div>`:''}
        `:''}
        ${m.sources&&m.sources.length?`
          <div class="detail-divider"></div>
          <div class="detail-section-label">Sources</div>
          ${m.sources.map(s=>`<div style="font-size:11px;color:var(--rust);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-bottom:3px;">${s}</div>`).join('')}`:''}
        ${(m.access_types&&m.access_types.length)||(m.access_notes)?`
          <div class="detail-divider"></div>
          <div class="detail-access-block">
            <div class="detail-access-header">
              <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              Visiting this marker
            </div>
            ${m.access_types&&m.access_types.length?`<div class="detail-access-chips">${m.access_types.map(t=>`<span class="detail-access-chip">${t.replace('-',' ')}</span>`).join('')}</div>`:''}
            ${m.access_notes?`<div class="detail-access-notes">${m.access_notes}</div>`:''}
          </div>`:''}
        <div class="detail-divider"></div>
        <div class="detail-section-label">Contributor</div>
        <div style="font-size:13px;color:var(--ink3)">${m.submittedBy||'—'} · ${m.dateSubmitted||''}</div>
        <div class="detail-actions">
          <button class="btn-primary" onclick="showToast('Opening directions…')">Get Directions</button>
          <button class="btn-secondary" onclick="showToast('Marker flagged for review')">Flag</button>
        </div>
        <div class="detail-source">Source: Historical Marker Database (hmdb.org) — placeholder attribution</div>
      </div>`;
  }

  const dv=document.getElementById('detail-view');
  dv.style.display='block';
  requestAnimationFrame(()=>dv.classList.add('open'));
}

// Tap a tag/person pill in detail to jump straight to filtered Explore
function filterByTag(tag){
  closeDetail();
  activeTagQuery=tag;
  const el=document.getElementById('tag-search'); if(el) el.value=tag;
  switchTab('explore');
}
function filterByPerson(person){
  closeDetail();
  activePeopleQuery=person;
  const el=document.getElementById('people-search'); if(el) el.value=person;
  switchTab('explore');
}

function closeDetail(){
  const dv=document.getElementById('detail-view');
  dv.classList.remove('open');
  setTimeout(()=>{dv.style.display='none';},300);
}

// ── Submit form ───────────────────────────────────────────────────
let formThemes=[];
let formLat=null, formLng=null;
let formMap=null, formPin=null;
let advancedOpen=false;

function renderSubmitForm(){
  // Theme grid
  const tg=document.getElementById('category-grid');
  if(tg) tg.innerHTML=THEMES.map(t=>`<button class="cat-option ${formThemes.includes(t.id)?'selected':''}" onclick="toggleFormTheme('${t.id}')"><div class="cat-swatch" style="background:${t.color}"></div>${t.label}</button>`).join('');
  // Physical type dropdown
  const ps=document.getElementById('form-physical-type');
  if(ps&&ps.options.length<=1) PHYSICAL_TYPES.forEach(p=>{const o=document.createElement('option');o.value=p.id;o.textContent=p.label;ps.appendChild(o);});
  // Wire up badge update on all advanced inputs
  ['form-subtitle','form-people','form-tags','form-access-notes','form-source','form-era-start','form-era-end'].forEach(id=>{
    const el=document.getElementById(id);
    if(el&&!el.dataset.badgeWired){el.addEventListener('input',updateAdvancedBadge);el.dataset.badgeWired='1';}
  });
  ['form-physical-type','form-condition'].forEach(id=>{
    const el=document.getElementById(id);
    if(el&&!el.dataset.badgeWired){el.addEventListener('change',updateAdvancedBadge);el.dataset.badgeWired='1';}
  });
  // Init map picker if not yet created
  initFormMap();
}

function initFormMap(){
  if(formMap) return; // already initialised
  const canvas=document.getElementById('form-map-canvas');
  if(!canvas||typeof google==='undefined') return;
  // Start at current position or default to Virginia demo area
  const defaultPos={lat:38.76,lng:-77.45};
  formMap=new google.maps.Map(canvas,{
    center:defaultPos, zoom:14, styles:MAP_STYLES,
    mapTypeControl:false, streetViewControl:false,
    fullscreenControl:false, zoomControl:true,
    gestureHandling:'greedy',
  });
  formPin=new google.maps.Marker({
    position:defaultPos, map:formMap, draggable:true,
    icon:{url:makeSvgPin('#B34A2A',false),scaledSize:new google.maps.Size(28,40),anchor:new google.maps.Point(14,40)},
  });
  formLat=defaultPos.lat; formLng=defaultPos.lng;
  updateCoordDisplay(defaultPos.lat,defaultPos.lng);
  // Update coords when pin is dragged
  formPin.addListener('dragend',()=>{
    const pos=formPin.getPosition();
    formLat=pos.lat(); formLng=pos.lng();
    updateCoordDisplay(formLat,formLng);
  });
  // Also allow tapping map to move pin
  formMap.addListener('click',e=>{
    formPin.setPosition(e.latLng);
    formLat=e.latLng.lat(); formLng=e.latLng.lng();
    updateCoordDisplay(formLat,formLng);
  });
  // Try to centre on user's actual location
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(p=>{
      const pos={lat:p.coords.latitude,lng:p.coords.longitude};
      formMap.setCenter(pos); formPin.setPosition(pos);
      formLat=pos.lat; formLng=pos.lng;
      updateCoordDisplay(formLat,formLng);
    },()=>{}); // silently fall back to default on error
  }
}

function updateCoordDisplay(lat,lng){
  const el=document.getElementById('form-coord-text');
  if(el) el.textContent=`${lat.toFixed(5)}, ${lng.toFixed(5)}`;
}

function toggleAdvanced(){
  advancedOpen=!advancedOpen;
  const body=document.getElementById('advanced-body');
  const chevron=document.getElementById('advanced-chevron');
  if(body) body.classList.toggle('open',advancedOpen);
  if(chevron) chevron.classList.toggle('open',advancedOpen);
  if(advancedOpen&&formMap) google.maps.event.trigger(formMap,'resize');
}

function updateAdvancedBadge(){
  const fields=['form-subtitle','form-people','form-tags','form-access-notes','form-source'];
  const selects=['form-physical-type','form-condition'];
  const era=document.getElementById('form-era-start')?.value;
  const accessChips=document.querySelectorAll('.access-chip.active').length;
  let count=0;
  fields.forEach(id=>{if(document.getElementById(id)?.value?.trim()) count++;});
  selects.forEach(id=>{if(document.getElementById(id)?.value) count++;});
  if(era) count++;
  count+=accessChips;
  const badge=document.getElementById('advanced-count');
  if(badge){
    badge.style.display=count?'inline':'none';
    badge.textContent=count+' filled';
  }
}

function toggleAccessChip(btn){
  btn.classList.toggle('active');
  updateAdvancedBadge();
}

function getActiveAccessTypes(){
  return [...document.querySelectorAll('.access-chip.active')].map(b=>b.dataset.val);
}
function toggleFormTheme(id){
  if(formThemes.includes(id)) formThemes=formThemes.filter(x=>x!==id);
  else formThemes.push(id);
  renderSubmitForm();
}
// pickLocation replaced by map picker (initFormMap)
function submitMarker(){
  const title=document.getElementById('form-title')?.value?.trim();
  if(!title){showToast('Please add a marker title');return;}
  if(!formThemes.length){showToast('Please select at least one theme');return;}
  const accessTypes=getActiveAccessTypes();
  const accessNotes=document.getElementById('form-access-notes')?.value||'';
  const m={
    id:'new-'+Date.now(),title,
    subtitle:document.getElementById('form-subtitle')?.value||'Community submission',
    body:document.getElementById('form-body')?.value||'',
    lat:formLat||38.7912, lng:formLng||-77.4103,
    themes:[...formThemes],
    physical_type:document.getElementById('form-physical-type')?.value||null,
    era_start:parseInt(document.getElementById('form-era-start')?.value)||null,
    era_end:parseInt(document.getElementById('form-era-end')?.value)||null,
    tags:(document.getElementById('form-tags')?.value||'').split(',').map(t=>t.trim().toLowerCase()).filter(Boolean),
    people:(document.getElementById('form-people')?.value||'').split(',').map(p=>p.trim()).filter(Boolean),
    condition:document.getElementById('form-condition')?.value||'Unknown',
    access_types:accessTypes,
    access_notes:accessNotes,
    status:'pending',submittedBy:'Demo User',
    dateSubmitted:new Date().toISOString().split('T')[0],
    sources:[],address:'Location pending',visits:0,
  };
  markers.push(m);
  if(gmap) placeGoogleMarkers();
  showToast('Submitted! Entering peer review queue.');
  // Reset all fields
  ['form-title','form-subtitle','form-body','form-era-start','form-era-end',
   'form-tags','form-people','form-source','form-access-notes'].forEach(id=>{
    const el=document.getElementById(id);if(el)el.value='';
  });
  document.querySelectorAll('.access-chip.active').forEach(c=>c.classList.remove('active'));
  updateAdvancedBadge();
  const condEl=document.getElementById('form-condition');if(condEl)condEl.value='';
  const physEl=document.getElementById('form-physical-type');if(physEl)physEl.value='';
  formThemes=[];
  // Close advanced section
  advancedOpen=false;
  const body=document.getElementById('advanced-body');
  const chevron=document.getElementById('advanced-chevron');
  if(body) body.classList.remove('open');
  if(chevron) chevron.classList.remove('open');
  // Re-render theme grid
  renderSubmitForm();
  setTimeout(()=>switchTab('review'),700);
}

// ── Review ────────────────────────────────────────────────────────
function renderReview(){
  const pending=markers.filter(m=>m.status==='pending');
  const list=document.getElementById('review-list');
  if(!pending.length){
    list.innerHTML=`<div class="empty-state"><svg viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg><p>Review queue is empty.</p></div>`;
    return;
  }
  list.innerHTML=pending.map(m=>`
    <div class="review-card fade-in" id="rc-${m.id}">
      <div class="review-card-body">
        <div style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:8px;">
          ${(m.themes||[]).map(tid=>{const t=THEMES.find(x=>x.id===tid);return t?`<span style="font-size:9px;font-weight:600;padding:2px 8px;border-radius:10px;background:${t.color}18;color:${t.color};border:0.5px solid ${t.color}40">${t.label}</span>`:''}).join('')}
          ${m.physical_type?`<span style="font-size:9px;padding:2px 8px;border-radius:10px;background:var(--stone2);color:var(--ink3)">${PHYSICAL_TYPES.find(p=>p.id===m.physical_type)?.label||''}</span>`:''}
          ${m.era_start?`<span style="font-size:9px;padding:2px 8px;border-radius:10px;background:var(--stone2);color:var(--ink3)">${m.era_start}${m.era_end&&m.era_end!==m.era_start?'–'+m.era_end:''}</span>`:''}
        </div>
        <div class="review-card-title">${m.title}</div>
        <div class="review-card-sub">${m.subtitle} · ${m.address}</div>
        ${m.body?`<div class="review-card-text">${m.body.slice(0,220)}${m.body.length>220?'…':''}</div>`:'<div class="review-card-text" style="color:var(--ink3);font-style:italic">No body text provided.</div>'}
        ${m.people&&m.people.length?`<div style="font-size:11px;color:var(--ink3);margin-top:3px;">People: ${m.people.join(', ')}</div>`:''}
        ${m.tags&&m.tags.length?`<div style="font-size:11px;color:var(--ink3);">Tags: ${m.tags.join(', ')}</div>`:''}
        <div class="review-submitter" style="margin-top:6px;">Submitted by ${m.submittedBy||'anonymous'} · ${m.dateSubmitted||''}</div>
      </div>
      <div class="review-actions">
        <button class="review-action-btn approve" onclick="reviewAction('${m.id}','approved')">Approve</button>
        <button class="review-action-btn reject"  onclick="reviewAction('${m.id}','rejected')">Reject</button>
        <button class="review-action-btn skip"    onclick="reviewAction('${m.id}','skip')">Skip</button>
      </div>
    </div>`).join('');
}

function reviewAction(id,action){
  const card=document.getElementById('rc-'+id);
  if(card){card.style.opacity='0';card.style.transform='translateX(40px)';card.style.transition='all 0.3s';setTimeout(()=>card.remove(),300);}
  if(action==='approved'){const m=markers.find(x=>x.id===id);if(m){m.status='approved';if(gmap)placeGoogleMarkers();}showToast('Marker approved and now live!');}
  else if(action==='rejected'){markers=markers.filter(x=>x.id!==id);showToast('Submission rejected.');}
  else showToast('Skipped — will review later.');
}

// ── Nearby ────────────────────────────────────────────────────────
function showNearby(){
  if(navigator.geolocation){
    showToast('Finding markers near you…');
    navigator.geolocation.getCurrentPosition(()=>{
      showToast(`${markers.filter(m=>m.status==='approved').length} markers in this region`);
      switchTab('explore');
    },()=>showToast('Enable location to find nearby markers'));
  } else showToast('Geolocation not supported');
}

// ── Toast ─────────────────────────────────────────────────────────
function showToast(msg){
  document.querySelectorAll('.toast').forEach(t=>t.remove());
  const t=document.createElement('div');t.className='toast';t.textContent=msg;
  document.body.appendChild(t);setTimeout(()=>t.remove(),3000);
}

// ── Init ──────────────────────────────────────────────────────────
renderLegend();
