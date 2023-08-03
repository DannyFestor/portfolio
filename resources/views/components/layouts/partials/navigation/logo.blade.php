<section
    x-data="{ open: false }"
    x-modelable="open"
    {{ $attributes->merge() }}
    id="logo"
    class="relative mx-auto">
    <section id="nav-logo" class="absolute top-0 flex h-[5rem]">
        <svg
            id="logo-b"
            class="absolute left-1/2 ml-2 mt-2 flex-shrink-0 transition-all group-hover:visible group-hover:h-[48px] group-hover:w-[34px] group-hover:-translate-x-[310%] group-hover:translate-y-[30%] group-hover:opacity-100"
            :class="open ? 'visible opacity-100 w-[34px] h-[48px] -translate-x-[310%] translate-y-[30%]' : 'invisible opacity-0 w-[70%] h-[70%] -translate-x-1/2 translate-y-[20px]'"
            width="7.3515mm"
            height="10.654mm"
            version="1.1"
            viewBox="0 0 7.3515 10.654"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g transform="translate(-101.11 -143.41)">
                <path
                    d="m101.11 154.06v-10.652h3.8444a5.0086 5.0086 0 0 1 1.6192 0.2196 2.2119 2.2119 0 0 1 1.1139 0.91281 2.8443 2.8443 0 0 1 0.46831 1.6298 2.5374 2.5374 0 0 1-0.47625 1.5346 2.1352 2.1352 0 0 1-1.3229 0.83079 2.4236 2.4236 0 0 1 1.5743 0.91282 2.7596 2.7596 0 0 1 0.52916 1.7013 2.9951 2.9951 0 0 1-0.74612 2.0717c-0.50006 0.56092-1.2674 0.83873-2.3019 0.83873zm1.6828-6.1807h2.1696a1.352 1.352 0 0 0 1.0583-0.42863 1.5637 1.5637 0 0 0 0.38629-1.0927 1.2859 1.2859 0 0 0-0.43921-1.0795 1.6087 1.6087 0 0 0-1.0425-0.35719h-2.1325zm0 4.5826h2.2992a1.5875 1.5875 0 0 0 1.1536-0.41275 1.6563 1.6563 0 0 0 0-2.2146 1.5399 1.5399 0 0 0-1.1324-0.43127h-2.3204z"
                    style="stroke-width: 0.26458"
                />
            </g>
        </svg>
        <svg
            id="logo-r"
            class="absolute left-1/2 ml-2 mt-2 flex-shrink-0 transition-all group-hover:visible group-hover:h-[48px] group-hover:w-[34px] group-hover:-translate-x-[215%] group-hover:translate-y-[40%] group-hover:opacity-100"
            :class="open ? 'visible opacity-100 w-[34px] h-[48px] -translate-x-[215%] translate-y-[40%]' : 'invisible opacity-0 w-[70%] h-[70%] -translate-x-1/2 translate-y-[20px]'"
            width="7.7388mm"
            height="10.652mm"
            version="1.1"
            viewBox="0 0 7.7388 10.652"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g transform="translate(-100.91 -143.41)">
                <path
                    d="m108.6 154.06h-1.8812l-1.5372-4.3762h-2.495v4.3762h-1.778v-10.652h4.273q1.7859 0 2.6247 0.87048a3.1168 3.1168 0 0 1 0.83873 2.2516q0 2.0532-1.778 2.8257zm-5.9134-5.9134h2.2119a2.0452 2.0452 0 0 0 1.4314-0.43919 1.5663 1.5663 0 0 0 0.46831-1.1986 1.4843 1.4843 0 0 0-0.46037-1.135 1.8203 1.8203 0 0 0-1.2938-0.4339h-2.3574z"
                    style="stroke-width: 0.26458"
                />
            </g>
        </svg>
        <svg
            id="logo-ue"
            class="absolute left-1/2 ml-2 mt-2 h-[60px] w-[60px] flex-shrink-0 -translate-x-1/2 transition-all group-hover:-translate-x-[75%]"
            :class="open ? '-translate-x-[75%] ' : '-translate-x-[50%] '"
            width="12.607mm"
            height="13.295mm"
            version="1.1"
            viewBox="0 0 12.607 13.295"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g transform="translate(-141.48 -200.54)">
                <path
                    d="m145.15 204.17-2.3178-0.11906c-0.6059-0.0317-1.0874-0.47096-1.0795-0.97896l0.0265-1.4049c0-0.49742 0.508-0.89694 1.1218-0.86519l2.2728 0.11906c0.60325 0.0317 1.0874 0.46831 1.0795 0.97896l-0.0265 1.442c-0.0185 0.48948-0.49742 0.85989-1.0768 0.82814z"
                    style="fill: none; stroke-width: 0.52917px; stroke: #000"
                />
                <path
                    d="m146.07 202.56a3.0506 3.0506 0 0 1 2.1167 0.0529c0.22489 0.0926 0.9472 0.38893 1.0266 0.61912 0.0608 0.18256-0.14288 0.43127-0.22754 0.60061-0.21961 0.4392 0.037 0.97631 0.56885 1.1986l2.1167 0.88106c0.55562 0.23283 1.1933 0.0476 1.4235-0.41275l0.64823-1.2674c0.23018-0.46038-0.0344-1.0186-0.59267-1.2515l-2.0796-0.86519c-0.55827-0.23019-1.1959-0.045-1.4234 0.41275l-0.36248 0.7276"
                    style="fill: none; stroke-width: 0.52917px; stroke: #000"
                />
                <path
                    d="m150.91 206.77-0.98689 4.8868a2.8443 2.8443 0 0 1-0.65617 1.4579q-0.45244 0.46037-1.5293 0.65087a6.9532 6.9532 0 0 1-2.5082-0.10054 7.4083 7.4083 0 0 1-2.331-0.81756 2.7464 2.7464 0 0 1-1.1589-1.188 2.5823 2.5823 0 0 1-0.10848-1.5663l1.0028-4.99 1.8918 0.36248-1.0583 4.9848c-0.13493 0.6694 0.2884 1.0134 0.68527 1.3229 0.39688 0.30956 0.91546 0.40481 1.4949 0.52916a3.7306 3.7306 0 0 0 1.7754-0.0503c0.4445-0.14287 0.65882-0.2831 0.79375-0.92339l1.0054-4.8869z"
                    style="stroke-width: 0.26458"
                />
            </g>
        </svg>
        <svg
            id="logo-c"
            class="absolute left-1/2 ml-2 mt-2 flex-shrink-0 transition-all group-hover:visible group-hover:h-[48px] group-hover:w-[34px] group-hover:translate-x-0 group-hover:translate-y-[40%] group-hover:opacity-100"
            :class="open ? 'visible opacity-100 w-[34px] h-[48px] translate-x-0 translate-y-[40%]' : 'invisible opacity-0 w-[70%] h-[70%] -translate-x-1/2 translate-y-[20px]'"
            width="7.684mm"
            height="10.985mm"
            version="1.1"
            viewBox="0 0 7.684 10.985"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g transform="translate(-123.99 -167.48)">
                <path
                    d="m130.02 174.59 1.6484 0.19579a4.3074 4.3074 0 0 1-1.1456 2.6458 3.4396 3.4396 0 0 1-2.5903 1.0319 3.2226 3.2226 0 0 1-2.1934-0.7329 4.6884 4.6884 0 0 1-1.2991-1.9817 8.1042 8.1042 0 0 1-0.45508-2.7702q0-2.4368 1.0583-3.9688a3.3946 3.3946 0 0 1 2.9422-1.5266 3.2994 3.2994 0 0 1 2.4421 0.97631q0.97631 0.97631 1.2303 2.794l-1.6484 0.18786q-0.4445-2.4156-1.995-2.4156c-0.66675 0-1.1827 0.33602-1.5505 1.0028s-0.55298 1.6378-0.55298 2.9104c0 1.2726 0.19579 2.2648 0.59267 2.9104 0.39687 0.64559 0.9181 0.9869 1.5663 0.9869a1.6854 1.6854 0 0 0 1.3229-0.6641 2.7437 2.7437 0 0 0 0.62706-1.5822z"
                    style="stroke-width: 0.26458"
                />
            </g>
        </svg>
        <svg
            id="logo-k"
            class="absolute left-1/2 ml-2 mt-2 flex-shrink-0 transition-all group-hover:visible group-hover:h-[48px] group-hover:w-[34px] group-hover:translate-x-[90%] group-hover:translate-y-[30%] group-hover:opacity-100"
            :class="open ? 'visible opacity-100 w-[34px] h-[48px] translate-x-[90%] translate-y-[30%]' : 'invisible opacity-0 w-[70%] h-[70%] -translate-x-1/2 translate-y-[20px]'"
            width="7.7444mm"
            height="10.657mm"
            version="1.1"
            viewBox="0 0 7.7444 10.657"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g transform="translate(-114.45 -148.64)">
                <path
                    d="m122.2 159.29h-1.9764l-2.0823-5.4345-1.9076 2.7332v2.7014h-1.778v-10.652h1.778v5.5959c0.2249-0.37836 0.38894-0.64294 0.48948-0.79375l3.2755-4.8075h1.7992l-2.368 3.5084z"
                    style="stroke-width: 0.26458"
                />
            </g>
        </svg>
        <svg
            id="logo-e"
            class="absolute left-1/2 ml-2 mt-2 flex-shrink-0 transition-all group-hover:visible group-hover:h-[48px] group-hover:w-[34px] group-hover:translate-x-[170%] group-hover:translate-y-[40%] group-hover:opacity-100"
            :class="open ? 'visible opacity-100 w-[34px] h-[48px] translate-x-[170%] translate-y-[40%]' : 'invisible opacity-0 w-[70%] h-[70%] -translate-x-1/2 translate-y-[20px]'"
            width="6.4109mm"
            height="10.652mm"
            version="1.1"
            viewBox="0 0 6.4109 10.652"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g transform="translate(-171.67 -159.57)">
                <path
                    d="m178.08 170.22h-6.4109v-10.652h6.35v1.5875h-4.572v2.884h3.6724v1.5399h-3.6724v2.9872h4.6329z"
                    style="stroke-width: 0.26458"
                />
            </g>
        </svg>
    </section>
</section>
