package com.datapath.web.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Result {
    List<String> days;
    List<String> funds;
    List<String> dates;
    List<CommonInfo> info;
}