package com.datapath.releasesintegration.parsers;

import com.datapath.persistence.entities.*;
import com.datapath.releasesintegration.domain.ProcedureResponseEntity;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import static com.datapath.persistence.utils.DateTimeUtils.parseOffsetDateTime;
import static com.datapath.releasesintegration.utils.JsonValuesUtils.*;
import static com.datapath.releasesintegration.utils.ParseEntityUtils.resolve;
import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;


@Component
@Slf4j
public class TenderParser {
    private static final String BY_UNP = "BY-UNP-";
    private static final String RELEASE_API = "releases-api";

    private Map<String, ProcedureResponseEntity.Party> partiesMap = new HashMap<>();

    private void initPartiesMap(ProcedureResponseEntity procedureResponseEntity) {
        List<ProcedureResponseEntity.Party> parties = resolve(procedureResponseEntity::getParties)
                .orElse(new ArrayList<>());

        parties.forEach(party -> {
            String id = resolve(party::getId).orElse(null);
            if (nonNull(id)) partiesMap.put(id, party);
        });
    }

    private void updateEntityFromParties(Party party) {
        String id = party.getParty();
        String scale = resolve(() -> getString(partiesMap.get(id).getDetails().getScale())).orElse(null);
        String url = resolve(() -> getString(partiesMap.get(id).getContactPoint().getUrl())).orElse(null);
        String outerId = resolve(() -> getString(partiesMap.get(id).getIdentifier().getId())).orElse(null);
        String region = resolve(() -> getString(partiesMap.get(id).getAddress().getRegion())).orElse(null);
        String name = resolve(() -> getString(partiesMap.get(id).getContactPoint().getName())).orElse(null);
        String scheme = resolve(() -> getString(partiesMap.get(id).getIdentifier().getScheme())).orElse(null);
        String email = resolve(() -> getString(partiesMap.get(id).getContactPoint().getEmail())).orElse(null);
        String locality = resolve(() -> getString(partiesMap.get(id).getAddress().getLocality())).orElse(null);
        Long departmentId = resolve(() -> getLong(partiesMap.get(id).getDetails().getDepartment())).orElse(null);
        String country = resolve(() -> getString(partiesMap.get(id).getAddress().getCountryName())).orElse(null);
        String postalCode = resolve(() -> getString(partiesMap.get(id).getAddress().getPostalCode())).orElse(null);
        String telephone = resolve(() -> getString(partiesMap.get(id).getContactPoint().getTelephone())).orElse(null);
        String streetAddress = resolve(() -> getString(partiesMap.get(id).getAddress().getStreetAddress())).orElse(null);

        if (isNull(party.getName())) party.setName(name);
        if (isNull(party.getOuterId())) party.setOuterId(outerId);
        party.setUrl(url);
        party.setScale(scale);
        party.setEmail(email);
        party.setScheme(scheme);
        party.setRegion(region);
        party.setCountry(country);
        party.setLocality(locality);
        party.setTelephone(telephone);
        party.setPostalCode(postalCode);
        party.setDepartmentId(departmentId);
        party.setStreetAddress(streetAddress);
        party.setIsCapital(nonNull(region) && region.equals("г. Минск"));
        party.setResident(nonNull(country) && country.equals("Беларусь"));
    }

    private Party parseToParty(ProcedureResponseEntity.ProcuringEntity procuringEntityItem) {
        String entityId = resolve(procuringEntityItem::getId).orElse(null);
        String name = resolve(() -> getString(procuringEntityItem.getName())).orElse(null);
        Party procuringEntity = Party.builder().name(name).party(entityId).build();
        updateEntityFromParties(procuringEntity);
        return nonNull(procuringEntity.getOuterId()) ? procuringEntity : null;
    }

    private Party parseToProcuringEntity(ProcedureResponseEntity.Tender tender) {
        ProcedureResponseEntity.ProcuringEntity procuringEntityItem = resolve(tender::getProcuringEntity)
                .orElse(null);
        return nonNull(procuringEntityItem) ? parseToParty(procuringEntityItem) : null;
    }

    private List<Party> parseToParties(List<ProcedureResponseEntity.Supplier> suppliers) {
        return suppliers.stream().map(supplierItem -> {
            String id = resolve(supplierItem::getId).orElse(null);
            String name = resolve(() -> getString(supplierItem.getName())).orElse(null);
            Party party = Party.builder().party(id).name(name).build();
            updateEntityFromParties(party);
            return party;
        }).collect(Collectors.toList());
    }

    private Party parseToSupplier(ProcedureResponseEntity.Contract contract) {
        List<ProcedureResponseEntity.Supplier> suppliers = resolve(contract::getSuppliers).orElse(new ArrayList<>());
        List<Party> suppliersList = parseToParties(suppliers);
        return suppliersList.isEmpty() ? null : suppliersList.get(0);
    }

    private Party parseToTenderer(ProcedureResponseEntity.Detail detail) {
        List<ProcedureResponseEntity.Supplier> tenderers = resolve(detail::getTenderers).orElse(new ArrayList<>());
        List<Party> tendrersList = parseToParties(tenderers);
        return tendrersList.isEmpty() ? null : tendrersList.get(0);
    }

    private ProcedureResponseEntity.Tender getTender(ProcedureResponseEntity procedureResponseEntity) {
        return resolve(procedureResponseEntity::getTender).orElse(null);
    }

    private List<ProcedureResponseEntity.Contract> getContracts(ProcedureResponseEntity procedureResponseEntity) {
        return resolve(procedureResponseEntity::getContracts).orElse(new ArrayList<>());
    }

    private Boolean isOrdinarySupplier(String str) {
        return  Pattern.compile("BY-UNP-(\\d+(;|,)?\\s*)+").matcher(str).replaceAll("").isEmpty();
    }

    private Boolean isOrdinaryAwardId(String str) {
        return Pattern.compile("BY-UNP-\\d+").matcher(str).matches();
    }

    private List<String> getIds(String str) {
        List<String> result = new ArrayList<>();
        Matcher m = Pattern.compile("(\\d+)([/;,])?").matcher(str);
        while (m.find())
            result.add(m.group(1));
        return result;
    }

    private List<String> getUNPs(String str) {
        List<String> result = new ArrayList<>();
        Matcher m = Pattern.compile("(((BY-UNP-?)|(УНП)|(УНН)|(ИНН))\\s*)+(\\d+)").matcher(str);
        while (m.find())
            result.add(m.group(7));
        return result;
    }


    private List<Party> parseToWinner(ProcedureResponseEntity.Award award) {
        List<ProcedureResponseEntity.Supplier> suppliers = resolve(award::getWinners)
                .orElse(new ArrayList<>());
        List<Party> parsedSuppliers = parseToParties(suppliers);

        List<Party> resultList = new ArrayList<>();

        for (Party rawSupplier : parsedSuppliers) {
            String parsedSupplier = rawSupplier.getParty().replaceAll("\\d+\\)\\s*", "");

            List<String> supplierIds;

            if (isOrdinarySupplier(parsedSupplier)) {
                supplierIds = getIds(parsedSupplier);
            } else {
                supplierIds = getUNPs(parsedSupplier);
                if (supplierIds.isEmpty()) {
                    supplierIds = Collections.singletonList(rawSupplier.getOuterId());
                }
            }

            for (String supplierId : supplierIds) {
                Party party = Party.builder().outerId(supplierId).party(BY_UNP + supplierId).build();
                updateEntityFromParties(party);
                resultList.add(party);
            }

        }
        return resultList;
    }

    private Party parseToBuyer(ProcedureResponseEntity.Contract contract) {
        ProcedureResponseEntity.ProcuringEntity procuringEntityItem = resolve(contract::getBuyer).orElse(null);
        return nonNull(procuringEntityItem) ? parseToParty(procuringEntityItem) : null;
    }

    private List<Document> parseToDocuments(ProcedureResponseEntity.Tender tender) {
        List<ProcedureResponseEntity.Document> documents = resolve(tender::getDocuments).orElse(new ArrayList<>());
        return parseToDocuments(documents);
    }

    private List<Document> parseToDocuments(List<ProcedureResponseEntity.Document> documents) {
        return documents.stream().map(documentItem -> {

            String title = resolve(documentItem::getTitle).orElse(null);
            String description = resolve(() -> getString(documentItem.getDescription())).orElse(null);
            return Document.builder().description(description).title(title).build();
        }).collect(Collectors.toList());
    }

    private Classification parseToClassification(ProcedureResponseEntity.Classification classificationEntity) {
        String id = resolve(classificationEntity::getId).orElse(null);
        String scheme = resolve(classificationEntity::getScheme).orElse(null);
        String description = resolve(() -> getString(classificationEntity.getDescription())).orElse(null);
        return Classification.builder()
                .classificationId(id)
                .classificationScheme(scheme)
                .classificationDescription(description)
                .build();

    }

    private List<TenderItem> parseToItems(ProcedureResponseEntity.Tender tender) {
        List<ProcedureResponseEntity.Item> items = resolve(tender::getItems).orElse(new ArrayList<>());
        return items.stream().map(itemObj -> {
            String unitId = resolve(() -> getString(itemObj.getUnit().getId())).orElse(null);
            String unitName = resolve(() -> getString(itemObj.getUnit().getName())).orElse(null);
            String currency = resolve(() -> getString(itemObj.getValue().getCurrency())).orElse(null);
            String unitCurrency = resolve(() -> getString(itemObj.getUnit().getValue().getCurrency())).orElse(null);
            Long lotId = resolve(() -> getLong(itemObj.getRelatedLot())).orElse(null);
            Double amount = resolve(() -> getDouble(itemObj.getValue().getAmount())).orElse(null);
            Double unitAmount = resolve(() -> getDouble(itemObj.getUnit().getValue().getAmount())).orElse(null);

            Classification classification = isNull(itemObj.getClassification())
                    ? null : parseToClassification(itemObj.getClassification());
            return TenderItem.builder()
                    .unitId(unitId)
                    .amount(amount)
                    .relatedLot(lotId)
                    .unitName(unitName)
                    .currency(currency)
                    .unitAmount(unitAmount)
                    .unitCurrency(unitCurrency)
                    .classification(classification)
                    .build();
        }).collect(Collectors.toList());
    }

    private List<ContractItem> parseToItems(ProcedureResponseEntity.Contract contract) {
        List<ProcedureResponseEntity.Item> items = resolve(contract::getItems).orElse(new ArrayList<>());
        return items.stream().map(itemObj -> {
            String unitId = resolve(() -> getString(itemObj.getUnit().getId())).orElse(null);
            String unitName = resolve(() -> getString(itemObj.getUnit().getName())).orElse(null);
            String currency = resolve(() -> getString(itemObj.getValue().getCurrency())).orElse(null);
            String unitCurrency = resolve(() -> getString(itemObj.getUnit().getValue().getCurrency())).orElse(null);
            String positionType = resolve(() -> getString(itemObj.getPositionType())).orElse(null);
            String productCountry = resolve(() -> getString(itemObj.getCountryOfOrigin())).orElse(null);
            Double amount = resolve(() -> getDouble(itemObj.getValue().getAmount())).orElse(null);
            Double unitAmount = resolve(() -> getDouble(itemObj.getUnit().getValue().getAmount())).orElse(null);

            Classification classification = isNull(itemObj.getClassification())
                    ? null : parseToClassification(itemObj.getClassification());

            return ContractItem.builder()
                    .unitId(unitId)
                    .amount(amount)
                    .unitName(unitName)
                    .currency(currency)
                    .unitAmount(unitAmount)
                    .positionType(positionType)
                    .unitCurrency(unitCurrency)
                    .productCountry(productCountry)
                    .classification(classification)
                    .build();
        }).collect(Collectors.toList());
    }

    private List<AwardItem> parseToItems(ProcedureResponseEntity.Award award) {
        List<ProcedureResponseEntity.Item> items = resolve(award::getItems).orElse(new ArrayList<>());
        return items.stream().map(itemObj -> {
            Long lotId = resolve(() -> getLong(itemObj.getRelatedLot())).orElse(null);
            String unitId = resolve(() -> getString(itemObj.getUnit().getId())).orElse(null);
            String unitName = resolve(() -> getString(itemObj.getUnit().getName())).orElse(null);
            String currency = resolve(() -> getString(itemObj.getValue().getCurrency())).orElse(null);
            String unitCurrency = resolve(() -> getString(itemObj.getUnit().getValue().getCurrency())).orElse(null);
            Double amount = resolve(() -> getDouble(itemObj.getValue().getAmount())).orElse(null);
            Double unitAmount = resolve(() -> getDouble(itemObj.getUnit().getValue().getAmount())).orElse(null);

            Classification classification = isNull(itemObj.getClassification())
                    ? null : parseToClassification(itemObj.getClassification());

            return AwardItem.builder()
                    .unitId(unitId)
                    .amount(amount)
                    .relatedLot(lotId)
                    .unitName(unitName)
                    .currency(currency)
                    .unitAmount(unitAmount)
                    .unitCurrency(unitCurrency)
                    .classification(classification)
                    .build();
        }).collect(Collectors.toList());
    }

    private List<Lot> parseToLots(ProcedureResponseEntity procedureResponseEntity) {
        List<ProcedureResponseEntity.Lot> lotItems = resolve(() ->
                procedureResponseEntity.getTender().getLots()).orElse(new ArrayList<>());

        return lotItems.stream().map(lotItem -> {
            String status = resolve(lotItem::getStatus).orElse(null);
            String currency = resolve(() -> getString(lotItem.getValue().getCurrency())).orElse(null);
            Double amount = resolve(() -> getDouble(lotItem.getValue().getAmount())).orElse(null);
            Long lotId = resolve(() -> getLong(lotItem.getId())).orElse(null);
            Boolean forSmallScaleBusiness = resolve(lotItem::getForSmallScaleBusiness).orElse(null);

            OffsetDateTime deliveryPeriodEndDate = resolve(()
                    -> parseOffsetDateTime(lotItem.getDeliveryPeriod().getEndDate())).orElse(null);
            OffsetDateTime deliveryPeriodStartDate = resolve(()
                    -> parseOffsetDateTime(lotItem.getDeliveryPeriod().getStartDate())).orElse(null);

            return Lot.builder()
                    .lotId(lotId)
                    .amount(amount)
                    .status(status)
                    .currency(currency)
                    .forSmallScaleBusiness(forSmallScaleBusiness)
                    .deliveryPeriodEndDate(deliveryPeriodEndDate)
                    .deliveryPeriodStartDate(deliveryPeriodStartDate)
                    .build();

        }).collect(Collectors.toList());
    }

    private List<Enquiry> parseToEnquiries(ProcedureResponseEntity.Tender tender) {
        List<ProcedureResponseEntity.Enquiry> enquiriesList = resolve(tender::getEnquiries).orElse(new ArrayList<>());
        return enquiriesList.stream().map(enquiryItem -> {
            String answer = resolve(() -> getString(enquiryItem.getAnswer())).orElse(null);
            String description = resolve(() -> getString(enquiryItem.getDescription())).orElse(null);
            OffsetDateTime date = resolve(() -> parseOffsetDateTime(enquiryItem.getDate())).orElse(null);
            OffsetDateTime dateAnswered = resolve(()
                    -> parseOffsetDateTime(enquiryItem.getDateAnswered())).orElse(null);
            return Enquiry.builder()
                    .description(description)
                    .answer(answer)
                    .date(date)
                    .dateAnswered(dateAnswered)
                    .build();
        }).collect(Collectors.toList());
    }

    private List<Award> parseToAwards(ProcedureResponseEntity procedureResponseEntity) {
        List<ProcedureResponseEntity.Award> awards = procedureResponseEntity.getAwards();

        List<Award> resultList = new ArrayList<>();
        awards.forEach(awardItem -> {

            List<AwardItem> items = parseToItems(awardItem);

            String awardId = resolve(awardItem::getId).orElse(null);
            OffsetDateTime date = resolve(() -> parseOffsetDateTime(awardItem.getDate())).orElse(null);
            OffsetDateTime contractPeriodStartDate = resolve(()
                    -> parseOffsetDateTime(awardItem.getContractPeriod().getStartDate())).orElse(null);
            OffsetDateTime contractPeriodEndDate = resolve(()
                    -> parseOffsetDateTime(awardItem.getContractPeriod().getEndDate())).orElse(null);

            List<Party> winners = parseToWinner(awardItem);

            for (Party winner : winners) {
                if (winners.size() > 1 || (winners.size() == 1 && !isOrdinaryAwardId(awardId))) {
                    awardId = items.isEmpty() || isNull(items.get(0).getRelatedLot())
                            ? awardId
                            : items.get(0).getRelatedLot() + "-" + winner.getOuterId();
                }
                Award award = Award.builder()
                        .date(date)
                        .items(items)
                        .awardId(awardId)
                        .winner(winner)
                        .contractPeriodEndDate(contractPeriodEndDate)
                        .contractPeriodStartDate(contractPeriodStartDate)
                        .build();
                award.getItems().forEach(item -> item.setAward(award));

                resultList.add(award);
            }
        });
        return resultList;
    }

    private List<Bid> parseToBids(ProcedureResponseEntity procedureResponseEntity) {
        List<ProcedureResponseEntity.Detail> details = resolve(() -> procedureResponseEntity.getBids().getDetails())
                .orElse(new ArrayList<>());

        return details.stream().map(detail -> {
            String bidId = resolve(detail::getId).orElse(null);
            String status = resolve(detail::getStatus).orElse(null);
            String currency = resolve(() -> detail.getValue().getCurrency()).orElse(null);
            Double amount = resolve(() -> getDouble(detail.getValue().getAmount())).orElse(null);
            Long relatedLot = resolve(() -> getLong(detail.getRelatedLot())).orElse(null);
            OffsetDateTime date = resolve(() -> parseOffsetDateTime(detail.getDate())).orElse(null);
            Party tenderer = parseToTenderer(detail);

            return Bid.builder()
                    .date(date)
                    .bidId(bidId)
                    .status(status)
                    .amount(amount)
                    .currency(currency)
                    .tenderer(tenderer)
                    .relatedLot(relatedLot)
                    .build();
        }).collect(Collectors.toList());
    }

    private List<Contract> parseToContracts(List<ProcedureResponseEntity.Contract> contractElements) {
        return contractElements.stream().map(contractElement -> {
            String title = resolve(() -> getString(contractElement.getTitle())).orElse(null);
            String funds = resolve(contractElement::getFunds).orElse(null);
            String status = resolve(contractElement::getStatus).orElse(null);
            String description = resolve(() -> getString(contractElement.getDescription())).orElse(null);
            Long contractId = resolve(() -> getLong(contractElement.getId())).orElse(null);
            String currency = resolve(() -> contractElement.getValue().getCurrency()).orElse(null);
            Double amount = resolve(() -> getDouble(contractElement.getValue().getAmount())).orElse(null);
            OffsetDateTime dateSigned = resolve(()
                    -> parseOffsetDateTime(contractElement.getDateSigned())).orElse(null);
            OffsetDateTime dateCreated = resolve(()
                    -> parseOffsetDateTime(contractElement.getDateCreated())).orElse(null);

            List<ContractItem> items = parseToItems(contractElement);
            Party supplier = parseToSupplier(contractElement);
            Party buyer = parseToBuyer(contractElement);

            Contract contract = Contract.builder()
                    .items(items)
                    .title(title)
                    .funds(funds)
                    .status(status)
                    .amount(amount)
                    .currency(currency)
                    .supplier(supplier)
                    .dateSigned(dateSigned)
                    .dateCreated(dateCreated)
                    .contractId(contractId)
                    .description(description)
                    .buyer(buyer)
                    .build();

            contract.getItems().forEach(item -> item.setContract(contract));
            return contract;
        }).collect(Collectors.toList());
    }

    private ProcedureType parseToProcedureType(ProcedureResponseEntity.Tender tender) {
        String type = resolve(tender::getProcurementMethodDetails).orElse(null);
        return ProcedureType.builder().nameEn(type).build();
    }

    public Tender parseToTender(ProcedureResponseEntity procedureResponseEntity) {
        initPartiesMap(procedureResponseEntity);

        Tender tender = new Tender();

        LocalDateTime now = LocalDateTime.now();

        tender.setDateCreated(OffsetDateTime.of(now, ZoneId.of("Europe/Minsk").getRules().getOffset(now)));

        try {
            TenderData tenderData = TenderData.builder()
                    .tender(tender)
                    .data(getString(new ObjectMapper().writeValueAsString(procedureResponseEntity)))
                    .build();
            tender.setData(tenderData);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        ProcedureResponseEntity.Tender tenderElement = getTender(procedureResponseEntity);
        List<ProcedureResponseEntity.Contract> contractElement = getContracts(procedureResponseEntity);

        String tenderId = procedureResponseEntity.getOcid();
        String source = resolve(procedureResponseEntity::getSource).orElse(null);
        OffsetDateTime date = resolve(() -> parseOffsetDateTime(procedureResponseEntity.getDate())).orElse(null);


        if (nonNull(tenderElement)) {

            String procurementMethodDetails = resolve(tenderElement::getProcurementMethodDetails).orElse(null);

            if (nonNull(procurementMethodDetails) && procurementMethodDetails.equals("exchangeTrades")) {
                log.info("{} - {} skip", tenderId, "exchangeTrades");
                return null;
            }
            String title = resolve(tenderElement::getTitle).orElse(null);
            String funds = resolve(tenderElement::getFunds).orElse(null);
            String status = resolve(tenderElement::getStatus).orElse(null);
            String holder = resolve(tenderElement::getHolder).orElse(null);
            String industry = resolve(tenderElement::getIndustry).orElse(null);
            String description = resolve(() -> getString(tenderElement.getDescription())).orElse(null);
            String procurementMethod = resolve(tenderElement::getProcurementMethod).orElse(null);
            String currency = resolve(() -> tenderElement.getValue().getCurrency()).orElse(null);

            Long releaseTenderId = resolve(() -> getLong(tenderElement.getId())).orElse(null);

            Double amount = resolve(() -> getDouble(tenderElement.getValue().getAmount())).orElse(null);

            OffsetDateTime datePublished = resolve(()
                    -> parseOffsetDateTime(tenderElement.getDatePublished())).orElse(null);
            OffsetDateTime tenderPeriodEndDate = resolve(()
                    -> parseOffsetDateTime(tenderElement.getTenderPeriod().getEndDate())).orElse(null);
            OffsetDateTime tenderPeriodStartDate = resolve(()
                    -> parseOffsetDateTime(tenderElement.getTenderPeriod().getStartDate())).orElse(null);

            Party procuringEntity = parseToProcuringEntity(tenderElement);
            ProcedureType procedureType = parseToProcedureType(tenderElement);
            List<Lot> lots = parseToLots(procedureResponseEntity);
            List<TenderItem> tenderItems = parseToItems(tenderElement);
            List<Document> documents = parseToDocuments(tenderElement);
            List<Enquiry> enquiries = parseToEnquiries(tenderElement);
            List<Award> awards = parseToAwards(procedureResponseEntity);
            List<Bid> bids = parseToBids(procedureResponseEntity);

            tender.setTitle(title);
            tender.setFunds(funds);
            tender.setStatus(status);
            tender.setHolder(holder);
            tender.setAmount(amount);
            tender.setCurrency(currency);
            tender.setIndustry(industry);
            tender.setDescription(description);
            tender.setProcedureType(procedureType);
            tender.setReleaseTenderId(releaseTenderId);
            tender.setProcurementMethod(procurementMethod);
            tender.setProcurementMethodDetails(procurementMethodDetails);
            tender.setIsCompetitive(isNull(procurementMethodDetails) || !procurementMethodDetails.equals("singleSource"));

            tender.setDatePublished(datePublished);
            tender.setTenderPeriodEndDate(tenderPeriodEndDate);
            tender.setTenderPeriodStartDate(tenderPeriodStartDate);

            tender.setBids(bids);
            tender.setLots(lots);
            tender.setAwards(awards);
            tender.setItems(tenderItems);
            tender.setDocuments(documents);
            tender.setProcuringEntity(procuringEntity);
            tender.setEnquiries(enquiries);
        }


        List<Contract> contracts = parseToContracts(contractElement);
        tender.setContracts(contracts);
        tender.getContracts().forEach(contract -> {
            contract.setTender(tender);
            contract.setProcurementMethodDetails(tender.getProcurementMethodDetails());
            contract.setIsCompetitive(tender.getIsCompetitive());
        });
        tender.setOrigin(RELEASE_API);
        tender.setDate(date);
        tender.setSource(source);
        tender.setTenderId(tenderId);


        return tender;

    }


}
