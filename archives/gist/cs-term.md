## CI

CI란, 소프트웨어 공학에서 지속적 통합(continuous integration, CI)은 지속적으로 품질 관리(Quality Control)를 적용하는 프로세스를 실행하는 것이다. (위키피디아)

CI/CD는 간단하게 말하자면 빌드, 테스트, 배포를 자동화하는 것을 뜻합니다.

## Flakes

Those were just flakes, no need to merge canary!

깃허브에서 이렇게 답변이 왔는데 무슨 뜻이야?

---

"Those were just flakes, no need to merge canary!"라는 답변은, 테스트에서 발생한 문제나 실패가 일시적인 것이며 심각한 문제가 아니라는 뜻입니다. 여기서 "flakes"는 테스트가 불규칙하게 실패했다가 다시 성공하는 현상을 의미합니다. 즉, 테스트의 실패가 시스템 자체의 문제 때문이 아니라 일시적인 요인 때문에 발생했을 수 있다는 것을 말합니다.

따라서 **canary** 버전을 병합할 필요가 없다는 의미입니다. canary 버전은 주로 실험적인 기능이나 변경 사항을 포함한 미리보기 버전인데, 이런 버전을 병합하지 않아도 된다는 뜻입니다.

## Tweaks

nextra@4.0.0-app-router.42 Pre-release
Patch Changes
242e0d0: search tweaks
3fc12a0: - Use Tailwind CSS CLI because CSS processing by tsup produce different, weird and broken result
Patch react-compiler with some fixes which isn't fixed

---

깃허브에서 **"tweaks"**는 일반적으로 코드, 문서, 또는 설정에 대한 **작고 세부적인 변경**을 의미합니다. 이러한 변경은 대규모의 기능 추가나 중요한 리팩토링이 아닙니다.

"tweaks"는 **세부적인 미세 조정이나 개선**을 의미하며, 프로젝트의 기능적 변화보다는 전체적인 품질이나 세부적인 요소를 다듬는 데 초점을 맞춥니다.
